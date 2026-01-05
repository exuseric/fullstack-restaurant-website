import { db } from "@/server/db";
import { menuCategories, menuItems, variants } from "@/server/db/schema";
import type {
  MenuBuilder,
  MenuRepository,
  MenuRow,
  MenuState,
} from "@/server/services/lib/types";
import { ValidationError } from "@/shared/errors";
import { asc, eq, sql } from "drizzle-orm";
import mapToResult from "@/services/menu/utils/map-to-result";
import menuBuilder from "@/services/menu/menu.builder";

class Repository implements MenuRepository {
  constructor(private readonly builder: (state: MenuState) => MenuBuilder) {}

  async findOne(state: MenuState) {
    const { select, where } = this.builder(state).build();

    if (!state.id) throw new ValidationError("id is required");

    const items = await db
      .select(select)
      .from(menuItems)
      .innerJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
      .leftJoin(variants, eq(menuItems.id, variants.menuItemId))
      .where(where)
      .groupBy(menuItems.id, menuCategories.id)
      .limit(1);

    const [item] = (items as MenuRow[]).map(mapToResult);

    if (!item) return null;

    return item;
  }

  async findMany(state: MenuState) {
    const { select, where, orderBy, pagination } = this.builder(state).build();

    const itemsQuery = db
      .select(select)
      .from(menuItems)
      .innerJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
      .leftJoin(variants, eq(menuItems.id, variants.menuItemId))
      .where(where)
      .groupBy(menuItems.id, menuCategories.id)
      .orderBy(asc(menuItems.categoryId), orderBy)
      .limit(pagination.perPage)
      .offset(pagination.offset);

    const countQuery = db
      .select({ count: sql<number>`COUNT(DISTINCT ${menuItems.id})::int` })
      .from(menuItems)
      .innerJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
      .where(where);

    const [items, total] = await Promise.all([itemsQuery, countQuery]);

    const result = (items as MenuRow[]).map(mapToResult);

    const totalCount = total[0]?.count ?? 0;
    const totalPages = Math.ceil(totalCount / pagination.perPage);

    return {
      items: result,
      totalCount,
      totalPages,
      page: state.pagination.page,
      perPage: pagination.perPage,
    };
  }
}

export default function menuRepository() {
  return new Repository(menuBuilder);
}
