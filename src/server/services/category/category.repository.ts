import { db } from "@/server/db";
import { menuCategories } from "@/server/db/schema";
import type {
  CategoryRepository,
  FindByGroupIdParams,
} from "@/server/services/lib/types";
import type { MenuCategory } from "@/shared/types";
import { eq, inArray } from "drizzle-orm";

class Repository implements CategoryRepository {
  private readonly SELECT = {
    id: menuCategories.id,
    title: menuCategories.title,
    description: menuCategories.description,
    showcase: menuCategories.showcase,
    groupId: menuCategories.groupId,
    slug: menuCategories.slug,
  } as const;

  async findOne(id: MenuCategory["id"]) {
    const [res] = await db
      .select(this.SELECT)
      .from(menuCategories)
      .where(eq(menuCategories.id, id))
      .limit(1);

    return res ?? null;
  }

  async findByGroupId(args: FindByGroupIdParams) {
    if (!args.groupId) return [];

    return await db
      .select(this.SELECT)
      .from(menuCategories)
      .where(eq(menuCategories.groupId, args.groupId))
      .limit(args.limit ?? 5);
  }

  async findMany(ids?: MenuCategory["id"][]) {
    if (!ids) {
      return await db.select(this.SELECT).from(menuCategories);
    }
    if (ids.length > 0) {
      return await db
        .select(this.SELECT)
        .from(menuCategories)
        .where(inArray(menuCategories.id, ids));
    }

    return [];
  }
}

export default function createCategoryRepository() {
  return new Repository();
}
