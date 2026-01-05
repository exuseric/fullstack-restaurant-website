import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { menuCategories } from "@/server/db/schema";
import categoryRepository from "@/server/services/category/category.repository";

const TEST_TIMEOUT = 10000;

describe("Category Repository Integration Tests (database)", () => {
  const repo = categoryRepository();

  it(
    "findOne should return a category when it exists",
    async () => {
      const [one] = await db.select().from(menuCategories).limit(1);
      if (!one)
        throw new Error("Test database must contain at least one category");

      const result = await repo.findOne(one.id);
      expect(result).not.toBeNull();
      expect(result!.id).toBe(one.id);
    },
    TEST_TIMEOUT,
  );

  it(
    "findOne should return null when category does not exist",
    async () => {
      const res = await repo.findOne(999999);
      expect(res).toBeNull();
    },
    TEST_TIMEOUT,
  );

  it(
    "findMany should return all categories when no ids provided",
    async () => {
      const res = await repo.findMany();
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBeGreaterThanOrEqual(0);
    },
    TEST_TIMEOUT,
  );

  it(
    "findMany should return requested categories when ids provided",
    async () => {
      const rows = await db
        .select({ id: menuCategories.id })
        .from(menuCategories)
        .limit(2);
      if (rows.length === 0)
        throw new Error("Test database must contain at least one category");

      const ids = rows.map((r) => r.id);
      const res = await repo.findMany(ids);

      expect(res.length).toBeGreaterThanOrEqual(1);
      for (const row of res) {
        expect(ids.includes(row.id)).toBe(true);
      }
    },
    TEST_TIMEOUT,
  );

  it(
    "findMany should return empty array when empty ids array provided",
    async () => {
      const res = await repo.findMany([]);
      expect(res).toEqual([]);
    },
    TEST_TIMEOUT,
  );
});
