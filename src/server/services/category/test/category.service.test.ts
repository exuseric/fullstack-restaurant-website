import categoryService from "@/services/category/category.service";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/shared/errors";
import { describe, expect, it, vi } from "vitest";
import type { CategoryRepository } from "@/services-lib/types";

describe("CategoryService Integration Tests", () => {
  // Helper to verify the base structure of a MenuCategory
  const categoryMatcher = expect.objectContaining({
    id: expect.any(Number),
    title: expect.any(String),
    description: expect.any(String),
    showcase: expect.any(Boolean),
    slug: expect.any(String),
    groupId: expect.anything(),
  });

  describe("allCategories", () => {
    it("should return all categories from the database", async () => {
      const service = categoryService();
      const categories = await service.allCategories();

      expect(categories).toBeInstanceOf(Array);

      if (categories.length > 0) {
        expect(categories[0]).toEqual(categoryMatcher);
        expect(categories[0]).not.toHaveProperty("searchVector");
      }
    });

    it("should throw InternalServerError when database fails", async () => {
      const mockRepo = {
        findMany: vi.fn().mockRejectedValue(new Error("DB Error")),
      } as unknown as CategoryRepository;

      const service = categoryService({ categoryRepository: mockRepo });

      await expect(service.allCategories()).rejects.toThrow(
        InternalServerError,
      );
      await expect(service.allCategories()).rejects.toThrow(
        "Failed to retrieve categories.",
      );
    });
  });

  describe("findById", () => {
    it("should return category when valid id exists", async () => {
      const service = categoryService();
      const all = await service.allCategories();

      if (!all[0]) {
        throw new Error("No categories in database to test findById");
      }

      const category = await service.findById(all[0].id);

      expect(category).toEqual(categoryMatcher);
      expect(category.id).toBe(all[0].id);
      expect(category).not.toHaveProperty("searchVector");
    });

    it("should throw NotFoundError for non-existent ID", async () => {
      const service = categoryService();

      await expect(service.findById(999999)).rejects.toThrow(NotFoundError);
      await expect(service.findById(999999)).rejects.toThrow(
        "Category with id: 999999 not found",
      );
    });

    it("should throw ValidationError for invalid IDs", async () => {
      const service = categoryService();

      //@ts-expect-error - Invalid ID type (testing runtime validation)
      await expect(service.findById("")).rejects.toThrow(ValidationError);
      await expect(service.findById(0)).rejects.toThrow(ValidationError);
      //@ts-expect-error - Invalid ID type (testing runtime validation)
      await expect(service.findById(null)).rejects.toThrow(ValidationError);
      await expect(
        //@ts-expect-error - Invalid ID type (testing runtime validation)
        service.findById(undefined),
      ).rejects.toThrow(ValidationError);
      await expect(service.findById(-1)).rejects.toThrow(ValidationError);
    });

    it("should not convert NotFoundError to InternalServerError", async () => {
      const service = categoryService();

      await expect(service.findById(888888)).rejects.toThrow(NotFoundError);
      await expect(service.findById(888888)).rejects.not.toThrow(
        InternalServerError,
      );
    });

    it("should throw InternalServerError when database fails", async () => {
      const mockRepo = {
        findOne: vi.fn().mockRejectedValue(new Error("DB Error")),
      } as unknown as CategoryRepository;

      const service = categoryService({ categoryRepository: mockRepo });

      await expect(service.findById(1)).rejects.toThrow(InternalServerError);
      await expect(service.findById(1)).rejects.toThrow(
        "Failed to retrieve category with id: 1",
      );
    });
  });

  describe("findByGroupId", () => {
    it("should return categories for a valid group", async () => {
      const service = categoryService();
      const all = await service.allCategories();
      const withGroup = all.find((c) => c.groupId !== null);

      if (!withGroup) {
        throw new Error("No categories with groupId in database");
      }

      const results = await service.findByGroupId({
        groupId: withGroup.groupId!,
      });

      expect(results).toBeInstanceOf(Array);

      if (results.length > 0) {
        expect(results[0]).toEqual(categoryMatcher);
        expect(results.every((c) => c.groupId === withGroup.groupId)).toBe(
          true,
        );
        expect(results.every((c) => !c.hasOwnProperty("searchVector"))).toBe(
          true,
        );
      }
    });

    it("should apply default limit of 5 when not specified", async () => {
      const service = categoryService();
      const all = await service.allCategories();
      const withGroup = all.find((c) => c.groupId !== null);

      if (!withGroup) {
        throw new Error("No categories with groupId to test limit");
      }

      const results = await service.findByGroupId({
        groupId: withGroup.groupId!,
      });

      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should respect custom limit parameter", async () => {
      const service = categoryService();
      const all = await service.allCategories();
      const withGroup = all.find((c) => c.groupId !== null);

      if (!withGroup) {
        throw new Error("No categories with groupId to test custom limit");
      }

      const results = await service.findByGroupId({
        groupId: withGroup.groupId!,
        limit: 2,
      });

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it("should return empty array for non-existent group", async () => {
      const service = categoryService();
      const results = await service.findByGroupId({ groupId: 999999 });

      expect(results).toEqual([]);
    });

    it("should return empty array for invalid groupId", async () => {
      const service = categoryService();

      const emptyString = await service.findByGroupId({
        //@ts-expect-error - Invalid ID type (testing runtime validation)
        groupId: "",
      });
      expect(emptyString).toEqual([]);

      const nullValue = await service.findByGroupId({
        groupId: null,
      });
      expect(nullValue).toEqual([]);
    });

    it("should throw InternalServerError when database fails", async () => {
      const mockRepo = {
        findByGroupId: vi.fn().mockRejectedValue(new Error("DB Error")),
      } as unknown as CategoryRepository;

      const service = categoryService({ categoryRepository: mockRepo });

      await expect(service.findByGroupId({ groupId: 1 })).rejects.toThrow(
        InternalServerError,
      );
      await expect(service.findByGroupId({ groupId: 1 })).rejects.toThrow(
        "Failed to retrieve categories by group id: 1",
      );
    });
  });

  describe("findMany", () => {
    it("should return empty array when given empty array", async () => {
      const service = categoryService();
      const results = await service.findMany([]);

      expect(results).toEqual([]);
    });

    it("should return categories for multiple valid IDs", async () => {
      const service = categoryService();
      const all = await service.allCategories();

      if (all.length < 2) {
        throw new Error("Not enough categories to test findMany");
      }

      const ids = [all[0]!.id, all[1]!.id];
      const results = await service.findMany(ids);

      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBeGreaterThan(0);

      if (results.length > 0) {
        expect(results[0]).toEqual(categoryMatcher);
        expect(results.every((c) => !c.hasOwnProperty("searchVector"))).toBe(
          true,
        );
      }
    });

    it("should validate all IDs in the array", async () => {
      const service = categoryService();
      const all = await service.allCategories();

      if (!all[0]) {
        throw new Error("No categories to test validation");
      }

      const validId = all[0].id;
      await expect(
        //@ts-expect-error - Invalid ID type (testing runtime validation)
        service.findMany([validId, ""]),
      ).rejects.toThrow(ValidationError);
      await expect(
        //@ts-expect-error - Invalid ID type (testing runtime validation)
        service.findMany([validId, null]),
      ).rejects.toThrow(ValidationError);
      await expect(service.findMany([validId, 0])).rejects.toThrow(
        ValidationError,
      );
      await expect(service.findMany([validId, -1])).rejects.toThrow(
        ValidationError,
      );
    });

    it("should throw InternalServerError when database fails", async () => {
      const mockRepo = {
        findMany: vi.fn().mockRejectedValue(new Error("DB Error")),
      } as unknown as CategoryRepository;

      const service = categoryService({ categoryRepository: mockRepo });

      await expect(service.findMany([1, 2])).rejects.toThrow(
        InternalServerError,
      );
      await expect(service.findMany([1, 2])).rejects.toThrow(
        "Failed to retrieve categories.",
      );
    });
  });

  describe("Repository Integration", () => {
    it("should handle concurrent operations correctly", async () => {
      const service = categoryService();
      const all = await service.allCategories();

      if (!all[0]) {
        throw new Error("No categories to test concurrent operations");
      }

      const validId = all[0].id;
      const withGroup = all.find((c) => c.groupId !== null);
      const validGroupId = withGroup?.groupId ?? 1;

      const [allCats, catById, catsByGroup] = await Promise.all([
        service.allCategories(),
        service.findById(validId),
        service.findByGroupId({ groupId: validGroupId }),
      ]);

      expect(allCats).toBeInstanceOf(Array);
      expect(allCats.length).toBeGreaterThan(0);
      expect(catById.id).toBe(validId);
      expect(catsByGroup).toBeInstanceOf(Array);

      // Verify no searchVector in results
      expect(catById).not.toHaveProperty("searchVector");
      allCats.forEach((cat) => {
        expect(cat).not.toHaveProperty("searchVector");
      });
    });

    it("should return consistent data across multiple calls", async () => {
      const service = categoryService();

      const firstCall = await service.allCategories();
      const secondCall = await service.allCategories();

      expect(firstCall.length).toBe(secondCall.length);

      const firstIds = firstCall.map((c) => c.id).sort((a, b) => a - b);
      const secondIds = secondCall.map((c) => c.id).sort((a, b) => a - b);

      expect(firstIds).toEqual(secondIds);
    });

    it("should verify unique slugs across all categories", async () => {
      const service = categoryService();
      const categories = await service.allCategories();

      if (categories.length === 0) {
        throw new Error("No categories to verify unique slugs");
      }

      const slugs = categories.map((c) => c.slug);
      const uniqueSlugs = new Set(slugs);

      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it("should enforce varchar(255) constraint on titles", async () => {
      const service = categoryService();
      const categories = await service.allCategories();

      if (categories.length === 0) {
        throw new Error("No categories to verify title constraints");
      }

      categories.forEach((cat) => {
        expect(cat.title.length).toBeGreaterThan(0);
        expect(cat.title.length).toBeLessThanOrEqual(255);
      });
    });
  });
});
