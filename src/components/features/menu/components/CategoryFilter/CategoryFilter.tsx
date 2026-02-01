import { getAllCategories } from "@/components/features/menu/lib/fetchCategories";
import { CategoryFilterClient } from "./CategoryFilterClient";

export async function CategoryFilter() {
  const categories = await getAllCategories();

  return <CategoryFilterClient categories={categories} />;
}
