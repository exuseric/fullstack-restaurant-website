import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { menuItems, menuCategories } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { FindOneResult, FindManyResult } from "@/server/services/lib/types";
import menuService from "@/server/services/menu/menu.service";
import categoryService from "@/server/services/category/category.service";
import * as useCases from "@/use-cases";

const TEST_TIMEOUT = 10000;

async function getAnyMenuItem() {
    const [item] = await db.select().from(menuItems).limit(1);
    if (!item) throw new Error("Test database must contain at least one menu item");
    return item;
}

async function getAnyCategoryWithItems() {
    const rows = await db
        .select({ categoryId: menuItems.categoryId })
        .from(menuItems)
        .limit(1);
    const row = rows[0];
    if (!row) {
        throw new Error("Test database must contain at least one category with items");
    }
    const [category] = await db
        .select()
        .from(menuCategories)
        .where(eq(menuCategories.id, row.categoryId));
    if (!category) throw new Error("Category referenced by items must exist");
    return { category };
}

describe("Use-cases Integration Tests (database)", () => {
    describe("Category use-cases", () => {
        it("getAllCategories should return same as service.allCategories", async () => {
            const expected = await categoryService().allCategories();
            const actual = await useCases.categoryUseCases.getAllCategories();

            expect(actual).toEqual(expected);
        }, TEST_TIMEOUT);

        it("getCategoryById should return same as service.findById", async () => {
            const [one] = await categoryService().allCategories();
            if (!one) throw new Error("Test database must have at least one category");

            const expected = await categoryService().findById(one.id);
            const actual = await useCases.categoryUseCases.getCategoryById(one.id);

            expect(actual).toEqual(expected);
        }, TEST_TIMEOUT);
    });

    describe("Menu use-cases", () => {
        it("getMenuById should return same as menuService.findById.execute", async () => {
            const item = await getAnyMenuItem();
            const expected = (await menuService().findById(item.id).execute()) as FindOneResult;
            const actual = await useCases.menuUseCases.getMenuById(item.id);

            expect(actual).toEqual(expected);
        }, TEST_TIMEOUT);

        it("getMenuList with default opts should match findMany", async () => {
            const expected = (await menuService().findMany().execute()) as FindManyResult;
            const actual = await useCases.menuUseCases.getMenuList();

            expect(actual).toEqual(expected);
        }, TEST_TIMEOUT);

        it("getMenuList with category filter should return items from that category", async () => {
            const { category } = await getAnyCategoryWithItems();
            const actual = await useCases.menuUseCases.getMenuList({ categoryIds: [category.id] });

            expect(actual.items.length).toBeGreaterThanOrEqual(1);
            for (const item of actual.items) {
                expect(item.category.id).toBe(category.id);
            }
        }, TEST_TIMEOUT);

        it("getMenuList with query should return matching items", async () => {
            const [item] = await db.select().from(menuItems).limit(1);
            if (!item) throw new Error("Test database must contain at least one menu item");

            const query = item.title.split(" ")[0] ?? item.title;
            const actual = await useCases.menuUseCases.getMenuList({ query });

            expect(actual.items.length).toBeGreaterThanOrEqual(1);
        }, TEST_TIMEOUT);
    });
});