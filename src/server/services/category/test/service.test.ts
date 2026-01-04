import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { menuCategories } from "@/server/db/schema";
import { NotFoundError, ValidationError, InternalServerError } from "@/shared/errors";
import categoryService from "@/server/services/category/category.service";

const TEST_TIMEOUT = 10000;

async function getAnyCategory() {
    const [category] = await db.select().from(menuCategories).limit(1);
    if (!category) throw new Error("Test database must contain at least one category");
    return category;
}

describe("Category Service Integration Tests (database)", () => {
    let service = categoryService();

    describe("allCategories", () => {
        it("should return all categories from the database", async () => {
            const result = await service.allCategories();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(0);
        }, TEST_TIMEOUT);
    });

    describe("findById", () => {
        it("should return a category when it exists", async () => {
            const category = await getAnyCategory();
            const result = await service.findById(category.id);
            expect(result.id).toBe(category.id);
            expect(result.title).toBe(category.title);
        }, TEST_TIMEOUT);

        it("should throw NotFoundError when category does not exist", async () => {
            const nonExistentId = 999999;
            await expect(service.findById(nonExistentId)).rejects.toThrow(NotFoundError);
        }, TEST_TIMEOUT);

        it("should throw ValidationError when id is invalid", async () => {
            // validateId treats falsy values as invalid
            await expect(service.findById(0)).rejects.toThrow(ValidationError);
        }, TEST_TIMEOUT);

        it("should wrap unexpected errors as InternalServerError", async () => {
            // create a repo stub that throws
            const badRepo = {
                findOne() {
                    throw new Error("boom");
                },
            } as any;
            const badService = categoryService(badRepo);
            await expect(badService.findById(1)).rejects.toThrow(InternalServerError);
        }, TEST_TIMEOUT);
    });

    describe("findMany", () => {
        it("should return empty array when given an empty ids array", async () => {
            const res = await service.findMany([]);
            expect(res).toEqual([]);
        }, TEST_TIMEOUT);

        it("should validate ids inside the array", async () => {
            await expect(service.findMany([0])).rejects.toThrow(ValidationError);
        }, TEST_TIMEOUT);

        it("should return the requested categories when ids provided", async () => {
            const [one] = await service.allCategories();
            if (!one) throw new Error("Test DB must contain at least one category");
            const res = await service.findMany([one.id]);
            expect(res.length).toBeGreaterThanOrEqual(1);
            expect(res[0].id).toBe(one.id);
        }, TEST_TIMEOUT);
    });
});
