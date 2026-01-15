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

  private mapToResult(row: {
    readonly id: number;
    readonly title: string;
    readonly description: string | null;
    readonly showcase: boolean | null;
    readonly groupId: number | null;
    readonly slug: string | null;
  }): MenuCategory {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      groupId: row.groupId!,
      slug: row.slug,
    };
  }

  async findOne(id: MenuCategory["id"]) {
    const [res] = await db
      .select(this.SELECT)
      .from(menuCategories)
      .where(eq(menuCategories.id, id))
      .limit(1);

    if (res != undefined) {
      return this.mapToResult(res);
    }

    return null;
  }

  async findByGroupId(args: FindByGroupIdParams) {
    if (!args.groupId) return [];
    const res = await db
      .select(this.SELECT)
      .from(menuCategories)
      .where(eq(menuCategories.groupId, args.groupId))
      .limit(args.limit ?? 5);

    return res.map((res) => this.mapToResult(res));
  }

  async findMany(ids?: MenuCategory["id"][]) {
    if (!ids) {
      const res = await db.select(this.SELECT).from(menuCategories);

      return res.map((res) => this.mapToResult(res));
    }
    if (ids.length > 0) {
      const res = await db
        .select(this.SELECT)
        .from(menuCategories)
        .where(inArray(menuCategories.id, ids));

      return res.map((res) => this.mapToResult(res));
    }

    return [];
  }
}

export default function createCategoryRepository() {
  return new Repository();
}
