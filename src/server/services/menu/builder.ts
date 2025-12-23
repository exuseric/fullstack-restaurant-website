import type {
  MenuBuilder,
  MenuState,
  Pagination,
} from "@/server/services/lib/types";
import { DEFAULT_MENU_STATE } from "@/server/services/lib/constants";
import { menuCategories, menuItems } from "@/server/db/schema";
import { and, eq, gte, lte, type SQL, sql } from "drizzle-orm";
import type { MenuVariant } from "@/shared/types";
import type { SelectedFields } from "drizzle-orm/pg-core";

class Builder implements MenuBuilder {
  constructor(private readonly state: MenuState) {}

  static ORDER_MAP = {
    rank: (searchQuery: MenuState["searchQuery"]) =>
      searchQuery ? sql`rank DESC` : sql`${menuItems.id} ASC`,
    price_asc: () => sql`${menuItems.price} ASC`,
    price_desc: () => sql`${menuItems.price} DESC`,
    name_asc: () => sql`${menuItems.title} ASC`,
    name_desc: () => sql`${menuItems.title} DESC`,
    id_desc: () => sql`${menuItems.id} DESC`,
    id_asc: () => sql`${menuItems.id} ASC`,
  } as const;

  private get select() {
    return {
      id: menuItems.id,
      title: menuItems.title,
      description: sql<string | null>`${menuItems.description}`,
      price: sql<number>`${menuItems.price}::int`,
      categoryId: menuItems.categoryId,
      category_id: menuCategories.id,
      category_title: menuCategories.title,
      category_description: sql<string | null>`${menuCategories.description}`,
      variants: sql<
        MenuVariant[]
      >`COALESCE(JSON_AGG(variants.*) FILTER (WHERE variants.id IS NOT NULL), '[]')`,
    };
  }

  private createSearch(term: MenuState["searchQuery"]) {
    const tsQuery = sql`websearch_to_tsquery('english', ${term})`;

    return {
      condition: sql`(${menuItems.searchVector} @@ ${tsQuery}) OR (${menuCategories.searchVector} @@ ${tsQuery})`,
      fields: {
        rank: sql`ts_rank(COALESCE(CASE WHEN ${menuItems.searchVector} @@ ${tsQuery} THEN ${menuItems.searchVector} ELSE ${menuCategories.searchVector} END, ${menuItems.searchVector}), ${tsQuery})`.as(
          "rank",
        ),
        matchSource:
          sql`CASE WHEN ${menuCategories.searchVector} @@ ${tsQuery} THEN 'category' ELSE 'item' END`.as(
            "match_source",
          ),
      },
    };
  }

  private createPagination() {
    const { page, perPage } = this.state.pagination;
    return {
      offset: (page - 1) * perPage,
      perPage,
    };
  }

  build() {
    const { searchQuery, categoryId, priceRange, orderBy, id } = this.state;

    const where: SQL[] = [];
    const select: SelectedFields = { ...this.select };

    if (searchQuery) {
      const { condition, fields } = this.createSearch(searchQuery);
      where.push(condition);
      Object.assign(select, fields);
    }

    const { min, max } = priceRange || {};
    if (min != null) where.push(gte(menuItems.price, min));
    if (max != null) where.push(lte(menuItems.price, max));

    if (categoryId != null) where.push(eq(menuItems.categoryId, categoryId));
    if (id != null) where.push(eq(menuItems.id, id));

    const orderFn =
      Builder.ORDER_MAP[orderBy ?? "id_asc"] ?? Builder.ORDER_MAP.id_asc;
    const pagination = this.createPagination();

    return {
      select: select,
      where: where.length ? and(...where.filter(Boolean)) : undefined,
      orderBy: orderFn(searchQuery),
      pagination,
    };
  }
}

const menuBuilder = (state: MenuState = DEFAULT_MENU_STATE) => {
  return new Builder(state);
};

export default menuBuilder;
