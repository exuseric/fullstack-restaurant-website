import type {
  FindManyResult,
  FindOneResult,
  MenuRepository,
} from "@/server/services/lib/types";
import menuService from "@/services/menu/menu.service";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/shared/errors";
import { describe, expect, it, vi } from "vitest";

describe("MenuService Integration Tests", () => {
  // Matcher for the FindOneResult structure
  /*
  {
    item: {
      id: 1,
      title: 'Eggs & Toast',
      description: 'Two farm-fresh eggs cooked the way you like them, served with two slices of toasted bread and sweet, roasted tomatoes.',
      price: 300,
      categoryId: 1
    },
    category: {
      id: 1,
      title: 'Breakfast & Brunch',
      groupId: undefined,
      slug: undefined
    },
    variants: []
  }
  */

  const menuItemMatcher = expect.objectContaining({
    item: expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      categoryId: expect.any(Number),
    }),
    category: expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      slug: expect.toBeOneOf([expect.any(String), undefined]),
      groupId: expect.toBeOneOf([expect.any(String), undefined]),
    }),
    variants: expect.any(Array),
  });

  describe("findById / execute", () => {
    it("should return a single menu item when valid id exists", async () => {
      const service = menuService();
      const list = (await service.findMany().execute()) as FindManyResult;
      if (!list) {
        throw new Error("No menu items in database to test findById");
      }
      const firstItem = list.items[0];
      if (!firstItem) {
        throw new Error("No menu items in database to test findById");
      }
      const result = (await service
        .findById(firstItem.item.id)
        .execute()) as FindOneResult;

      if (!result) {
        throw new Error("No menu items in database to test findById");
      }
      expect(result).toEqual(menuItemMatcher);
      expect(result.item.id).toBe(firstItem.item.id);
    });

    it("should throw NotFoundError for non-existent ID", async () => {
      const service = menuService();
      await expect(service.findById(999999).execute()).rejects.toThrow(
        NotFoundError,
      );
    });

    it("should throw ValidationError for invalid ID types", async () => {
      const service = menuService();
      // @ts-expect-error - Invalid ID (testing runtime validation)
      expect(() => service.findById("invalid")).toThrow(ValidationError);
      expect(() => service.findById(-1)).toThrow(ValidationError);
    });
  });

  describe("findMany / execute", () => {
    it("should return a paginated list of items", async () => {
      const service = menuService();
      const result = (await service.findMany().execute()) as FindManyResult;

      if (!result) {
        throw new Error("No menu items in database to test findById");
      }

      expect(result).toHaveProperty("items");
      expect(result).toHaveProperty("totalCount");
      expect(result.items).toBeInstanceOf(Array);

      if (result.items.length > 0) {
        expect(result.items[0]).toEqual(menuItemMatcher);
      }
    });

    it("should respect pagination parameters", async () => {
      const service = menuService();
      const page1 = (await service
        .page({ page: 1, perPage: 1 })
        .findMany()
        .execute()) as FindManyResult;
      const page2 = (await service
        .page({ page: 2, perPage: 1 })
        .findMany()
        .execute()) as FindManyResult;

      if (!page1 || !page2) {
        throw new Error("No menu items in database to test findById");
      }
      if (page1.items.length > 0 && page2.items.length > 0) {
        expect(page1.items[0]!.item.id).not.toBe(page2.items[0]!.item.id);
        expect(page1.page).toBe(1);
        expect(page2.page).toBe(2);
      }
    });
  });

  describe("Filtering Logic", () => {
    it("should filter by categoryId", async () => {
      const service = menuService();
      const allItems = (await service.findMany().execute()) as FindManyResult;

      if (!allItems) {
        throw new Error("No menu items in database to test findById");
      }

      if (allItems.items.length === 0) return;

      const targetCatId = allItems.items[0]!.category.id;
      const result = (await service
        .findByCategoryIds([targetCatId])
        .execute()) as FindManyResult;

      expect(result.items.every((i) => i.category.id === targetCatId)).toBe(
        true,
      );
    });

    it("should filter by price range", async () => {
      const service = menuService();
      const min = 5;
      const max = 20;

      const result = (await service
        .findByPriceRange({ min, max })
        .execute()) as FindManyResult;
      if (!result) {
        throw new Error("No menu items in database to test findByPriceRange");
      }
      result.items.forEach((res) => {
        expect(res.item.price).toBeGreaterThanOrEqual(min);
        expect(res.item.price).toBeLessThanOrEqual(max);
      });
    });

    it("should throw ValidationError when range is inverted", async () => {
      const service = menuService();
      expect(() => service.findByPriceRange({ min: 100, max: 10 })).toThrow(
        ValidationError,
      );
    });
  });

  describe("Chaining and Immutability", () => {
    it("should maintain immutability when chaining", async () => {
      const baseService = menuService();
      const filteredService = baseService.findByCategoryIds([1]);

      expect(baseService).not.toBe(filteredService);
      // @ts-expect-error - checking private state for test purposes
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(baseService.state.categoryIds).toBeNull();
      // @ts-expect-error - checking private state for test purposes
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(filteredService.state.categoryIds).toEqual([1]);
    });

    it("should prevent search/category filtering after findById", async () => {
      const service = menuService().findById(1);

      expect(() => service.findByCategoryIds([2])).toThrow(ValidationError);
      expect(() => service.searchTerm({ query: "pizza" })).toThrow(
        ValidationError,
      );
    });

    it("should allow filtering after reset()", async () => {
      const service = menuService().findById(1).reset();
      expect(() => service.findByCategoryIds([2])).not.toThrow();
    });
  });

  describe("Error Handling", () => {
    it("should wrap repository errors in InternalServerError", async () => {
      const mockRepo = {
        findMany: vi.fn().mockRejectedValue(new Error("Database Crash")),
        findOne: vi.fn(),
      } as unknown as MenuRepository;

      const service = menuService({ repository: mockRepo });

      await expect(service.findMany().execute()).rejects.toThrow(
        InternalServerError,
      );
      await expect(service.findMany().execute()).rejects.toThrow(
        "Failed to fetch menu items",
      );
    });

    it("should propagate NotFoundError from findOne correctly", async () => {
      const mockRepo = {
        findOne: vi.fn().mockResolvedValue(null),
      } as unknown as MenuRepository;

      const service = menuService({ repository: mockRepo });

      await expect(service.findById(1).execute()).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});