import { getAllCategories } from "@/components/features/menu-filters/lib/fetchCategories";
import { CategoryFilterClient } from "./CategoryFilterClient";

export async function CategoryFilter() {
  const categories = await getAllCategories();

  return <CategoryFilterClient categories={categories} />;
}