import { db } from "@/server/db";
import { menuCategories } from "@/server/db/schema";
import type { CategoryRepository } from "@/server/services/lib/types";
import type { MenuCategory } from "@/shared/types";
import { eq } from "drizzle-orm";

class Repository implements CategoryRepository {
  private readonly SELECT = {
    id: menuCategories.id,
    title: menuCategories.title,
    description: menuCategories.description,
    showcase: menuCategories.showcase,
  } as const;

  async findOne(id: MenuCategory["id"]): Promise<MenuCategory | null> {
    const [res] = await db
      .select(this.SELECT)
      .from(menuCategories)
      .where(eq(menuCategories.id, id))
      .limit(1);

    return res ?? null;
  }

  async findMany(): Promise<MenuCategory[]> {
    return await db.select(this.SELECT).from(menuCategories);
  }
}

let instance: Repository | null = null;

export default function categoryRepository() {
  return (instance ??= new Repository());
}
