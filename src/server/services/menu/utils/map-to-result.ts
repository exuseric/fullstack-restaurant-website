import type { FindOneResult, MenuRow } from "@/server/services/lib/types";

export default function mapToResult(row: MenuRow): FindOneResult {
  return {
    item: {
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      categoryId: row.category_id,
    },
    category: {
      id: row.category_id,
      title: row.category_title,
    },
    variants: row.variants ?? [],
  };
}
