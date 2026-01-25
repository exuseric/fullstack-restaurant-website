import menuService from "@/server/services/menu/menu.service";
import type {
    FindManyResult,
    PriceRange,
    Pagination,
    OrderBy,
} from "@/server/services/lib/types";
import type { MenuCategory } from "@/shared/types";

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

    if (opts.categoryIds && opts.categoryIds.length > 0) svc = svc.findByCategoryIds(opts.categoryIds);
    if (opts.priceRange) svc = svc.findByPriceRange(opts.priceRange);
    if (opts.query) svc = svc.searchTerm({ query: opts.query });
    if (opts.pagination) svc = svc.page(opts.pagination);

    return (await svc.execute()) as FindManyResult;
}