import { db as DB } from "@/server/db";
import type { PriceRepository } from "@/services/lib/types";
import { menuItems } from "@/server/db/schema";
import { sql } from "drizzle-orm";

type DbType = typeof DB;

class Repository implements PriceRepository {
  constructor(private readonly db: DbType) {}

  async getMinMax() {
    return await this.db
      .select({
        min: sql<number>`MIN(${menuItems.price})::int`,
        max: sql<number>`MAX(${menuItems.price})::int`,
      })
      .from(menuItems);
  }
}

export const priceRepository = (db: DbType = DB) => new Repository(db);
