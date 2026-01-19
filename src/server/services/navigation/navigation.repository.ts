import { db } from "@/server/db";
import { menuCategories, navigationItems } from "@/server/db/schema";
import type { NavigationRepository } from "@/services-lib/types";
import { eq } from "drizzle-orm";

class Repository implements NavigationRepository {
  #SELECT = {
    // Navigation item fields
    id: navigationItems.id,
    title: navigationItems.title,
    slug: navigationItems.slug,
    url: navigationItems.url,
    parentId: navigationItems.parentId,
    categoryId: navigationItems.categoryId,
    groupId: navigationItems.groupId,
    catId: menuCategories.id,
    catTitle: menuCategories.title,
    catSlug: menuCategories.slug,
    catGroupId: menuCategories.groupId,
  };

  async getAll() {
    // Single query with LEFT JOIN to get all navigation items and their categories
    const results = await db
      .select(this.#SELECT)
      .from(navigationItems)
      .leftJoin(
        menuCategories,
        eq(navigationItems.groupId, menuCategories.groupId),
      )
      .orderBy(navigationItems.id, menuCategories.id);
    return results;
  }
}

export default function createNavigationRepository() {
  return new Repository();
}
