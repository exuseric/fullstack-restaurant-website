import categoryService from "@/server/services/category/category.service";
import type { MenuCategory } from "@/shared/types";

export async function getAllCategories(): Promise<MenuCategory[]> {
    return await categoryService().allCategories();
}
