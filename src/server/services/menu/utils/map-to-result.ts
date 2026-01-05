import type { FindOneResult, MenuRow } from "@/services-lib/types";

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
      groupId: row.category_group,
      slug: row.category_slug,
    },
    variants: row.variants ?? [],
  };
}
