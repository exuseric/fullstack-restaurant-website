import categoryService from "@/server/services/category/category.service";
import type { MenuCategory } from "@/shared/types";

export async function getAllCategories(): Promise<MenuCategory[]> {
    return await categoryService().allCategories();
}

export async function getCategoryById(id: MenuCategory["id"]): Promise<MenuCategory | null> {
    return await categoryService().findById(id);
}

