import { db } from "@/server/db";
import { menuCategories, menuItems } from "@/server/db/schema";
import { DEFAULT_MENU_STATE } from "@/server/services/lib/constants";
import type {
  FindManyResult,
  FindOneResult,
} from "@/server/services/lib/types";
import menuService from "@/server/services/menu/menu.service";
import { NotFoundError } from "@/shared/errors";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";

const TEST_TIMEOUT = 10000;

async function getAnyMenuItem() {
  const [item] = await db.select().from(menuItems).limit(1);
  if (!item)
    throw new Error("Test database must contain at least one menu item");
  return item;
}

async function getAnyCategoryWithItems() {
  const rows = await db
    .select({ categoryId: menuItems.categoryId })
    .from(menuItems)
    .limit(1);
  const row = rows[0];
  if (!row) {
    throw new Error(
      "Test database must contain at least one category with items",
    );
  }
  const [category] = await db
    .select()
    .from(menuCategories)
    .where(eq(menuCategories.id, row.categoryId));
  if (!category) throw new Error("Category referenced by items must exist");
  return { category };
}

describe("Menu Service Integration Tests (database)", () => {
  const service = menuService();

  describe("findById", () => {
    it(
      "should return a single item from the database",
      async () => {
        const item = await getAnyMenuItem();

        const result = (await service
          .findById(item.id)
          .execute()) as FindOneResult;

        expect(result.item.id).toBe(item.id);
        expect(result.item.categoryId).toBe(item.categoryId);
        expect(result.category.id).toBe(item.categoryId);
      },
      TEST_TIMEOUT,
    );

    it(
      "should throw NotFoundError if the item does not exist",
      async () => {
        const nonExistentId = 9999;

        await expect(service.findById(nonExistentId).execute()).rejects.toThrow(
          NotFoundError,
        );
      },
      TEST_TIMEOUT,
    );
  });

  describe("findMany", () => {
    it(
      "should query the database with the default state",
      async () => {
        const result = (await service.findMany().execute()) as FindManyResult;

        console.log(result);
        expect(result.items.length).toBeGreaterThanOrEqual(0);
        expect(result.page).toBe(DEFAULT_MENU_STATE.pagination.page);
        expect(result.perPage).toBe(DEFAULT_MENU_STATE.pagination.perPage);
        expect(result.totalPages).toBeGreaterThanOrEqual(1);
      },
      TEST_TIMEOUT,
    );
  });

  describe("Query Building and Chaining", () => {
    it(
      "should build state for findByCategoryId",
      async () => {
        const { category } = await getAnyCategoryWithItems();

        const result = (await service
          .findByCategoryId(category.id)
          .execute()) as FindManyResult;

        expect(result.items.length).toBeGreaterThanOrEqual(1);
        for (const item of result.items) {
          expect(item.category.id).toBe(category.id);
        }
      },
      TEST_TIMEOUT,
    );

    it(
      "should build state for findByPriceRange",
      async () => {
        const prices = await db
          .select({ price: menuItems.price })
          .from(menuItems)
          .limit(2);
        if (prices.length === 0) {
          throw new Error("Test database must contain at least one menu item");
        }
        const values = prices.map((p) => p.price);

        if (!values.every((v) => typeof v === "string")) {
          throw new Error(
            "Test database must contain at least one menu item with a number price",
          );
        }
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = { min, max };

        const result = (await service
          .findByPriceRange(range)
          .execute()) as FindManyResult;

        for (const item of result.items) {
          expect(item.item.price).toBeGreaterThanOrEqual(range.min);
          expect(item.item.price).toBeLessThanOrEqual(range.max);
        }
      },
      TEST_TIMEOUT,
    );

    it(
      "should build state for search",
      async () => {
        const [item] = await db.select().from(menuItems).limit(1);
        if (!item)
          throw new Error("Test database must contain at least one menu item");

        const query = item.title.split(" ")[0] ?? item.title;

        const result = (await service
          .searchTerm({ query })
          .execute()) as FindManyResult;

        expect(result.items.length).toBeGreaterThanOrEqual(1);
      },
      TEST_TIMEOUT,
    );

    it(
      "should build state for page",
      async () => {
        const pagination = { page: 2, perPage: 1 };
        const page1 = (await service
          .page({ page: 1, perPage: 1 })
          .execute()) as FindManyResult;
        const page2 = (await service
          .page(pagination)
          .execute()) as FindManyResult;

        expect(page1.items.length).toBeLessThanOrEqual(1);
        expect(page2.items.length).toBeLessThanOrEqual(1);
        if (page1.items.length === 1 && page2.items.length === 1) {
          const first = page1.items[0];
          const second = page2.items[0];
          expect(first!.item.id).not.toBe(second!.item.id);
        }
      },
      TEST_TIMEOUT,
    );

    it(
      "should chain multiple state modifiers correctly",
      async () => {
        const { category } = await getAnyCategoryWithItems();
        const range = { min: 0, max: Number.MAX_SAFE_INTEGER };
        const pagination = { page: 1, perPage: 2 };

        const result = (await service
          .findByCategoryId(category.id)
          .findByPriceRange(range)
          .page(pagination)
          .execute()) as FindManyResult;

        expect(result.items.length).toBeLessThanOrEqual(pagination.perPage);
        for (const item of result.items) {
          expect(item.category.id).toBe(category.id);
          expect(item.item.price).toBeGreaterThanOrEqual(range.min);
          expect(item.item.price).toBeLessThanOrEqual(range.max);
        }
      },
      TEST_TIMEOUT,
    );

    it(
      "should allow searching and then filtering",
      async () => {
        const [item] = await db.select().from(menuItems).limit(1);
        if (!item)
          throw new Error("Test database must contain at least one menu item");

        const query = item.title.split(" ")[0] ?? item.title;
        const pagination = { page: 1, perPage: 10 };

        const result = (await service
          .searchTerm({ query })
          .page(pagination)
          .execute()) as FindManyResult;

        expect(result.items.length).toBeGreaterThanOrEqual(1);
      },
      TEST_TIMEOUT,
    );

    it(
      "should override id when chaining",
      async () => {
        const base = (await service.findMany().execute()) as FindManyResult;
        const anyItem = base.items[0];
        if (!anyItem) {
          throw new Error("Test database must contain at least one menu item");
        }

        const byId = (await service
          .findById(anyItem.item.id)
          .execute()) as FindOneResult;
        expect(byId.item.id).toBe(anyItem.item.id);

        const manyAfter = (await service
          .findMany()
          .execute()) as FindManyResult;
        expect(manyAfter).toEqual(base);
      },
      TEST_TIMEOUT,
    );
  });
});
