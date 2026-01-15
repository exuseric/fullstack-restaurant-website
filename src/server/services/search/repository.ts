import { searchConfig } from "@/components/features/search/lib/search.config";
import { db } from "@/server/db";
import { menuCategories, menuItems } from "@/server/db/schema";
import { desc, eq, type SQL, sql } from "drizzle-orm";
import type { SearchRepository } from "@/services-lib/types";

export class Repository implements SearchRepository {
  #sanitizeSearchTerm(term: string) {
    return term.replace(/'/g, "''").trim();
  }

  #menuItemsQuery(searchFn: SQL) {
    return db
      .select({
        id: menuItems.id,
        title: menuItems.title,
        description: menuItems.description,
        price: sql<number>`${menuItems.price}::int`,
        categoryId: menuItems.categoryId,
        type: sql<"menu_item">`'menu_item'`,
        slug: menuItems.slug,
        rank: sql<number>`GREATEST(
          ts_rank(${menuItems.searchVector}, ${searchFn}),
          ts_rank(${menuCategories.searchVector}, ${searchFn}) * 0.8
        )`,
      })
      .from(menuItems)
      .innerJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
      .where(
        sql`${menuItems.searchVector} @@ ${searchFn}
         OR ${menuCategories.searchVector} @@ ${searchFn}`,
      )
      .orderBy(
        desc(sql`GREATEST(
        ts_rank(${menuItems.searchVector}, ${searchFn}),
        ts_rank(${menuCategories.searchVector}, ${searchFn}) * 0.8
      )`),
      )
      .limit(searchConfig.limits.perCategory);
  }

  #categoriesQuery(searchFn: SQL) {
    return db
      .select({
        id: menuCategories.id,
        title: menuCategories.title,
        description: menuCategories.description,
        type: sql<"category">`'category'`,
        slug: menuCategories.slug,
        rank: sql<number>`ts_rank(${menuCategories.searchVector}, ${searchFn})`,
      })
      .from(menuCategories)
      .where(sql`${menuCategories.searchVector} @@ ${searchFn}`)
      .orderBy(desc(sql`ts_rank(${menuCategories.searchVector}, ${searchFn})`))
      .limit(searchConfig.limits.perCategory);
  }

  async search(query: string) {
    const sanitized = this.#sanitizeSearchTerm(query);
    const searchFn = sql.raw(`websearch_to_tsquery('english', '${sanitized}')`);

    const [menuItems, categories] = await Promise.all([
      this.#menuItemsQuery(searchFn),
      this.#categoriesQuery(searchFn),
    ]);

    return {
      menuItems,
      categories,
    };
  }
}

export const searchRepository = new Repository();
