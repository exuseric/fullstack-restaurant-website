import type { MenuCategory } from "@/shared/types";
import type {
  FindManyResult,
  FindOneResult,
  OrderBy,
  Pagination,
  PriceRange,
} from "@/services/lib/types";
import menuService from "@/services/menu/menu.service";

export type MenuListOptions = {
  categoryIds?: MenuCategory["id"][] | null;
  priceRange?: PriceRange | null;
  pagination?: Pagination | null;
  query?: string | null;
  orderBy?: OrderBy | null;
};

export async function getMenuList(
  opts: MenuListOptions = {},
): Promise<FindManyResult> {
  let svc = menuService();

  if (opts.categoryIds && opts.categoryIds.length > 0)
    svc = svc.findByCategoryIds(opts.categoryIds);
  if (opts.priceRange) svc = svc.findByPriceRange(opts.priceRange);
  if (opts.query) svc = svc.searchTerm({ query: opts.query });
  if (opts.pagination) svc = svc.page(opts.pagination);

  return (await svc.execute()) as FindManyResult;
}

export async function getMenuById(id: number): Promise<FindOneResult | null> {
  const result = await menuService().findById(id).execute();
  return (result as FindOneResult | null) ?? null;
}