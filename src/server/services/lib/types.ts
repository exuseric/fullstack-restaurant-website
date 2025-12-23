import type { MenuCategory } from "@/shared/types";

export interface CategoryRepository {
  findOne(id: MenuCategory["id"]): Promise<MenuCategory | null>;
  findMany(): Promise<MenuCategory[]>;
}

export interface CategoryService {
  findById(id: MenuCategory["id"]): Promise<MenuCategory | null>;
  allCategories(): Promise<MenuCategory[]>;
}
