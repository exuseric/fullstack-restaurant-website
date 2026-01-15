import menuService from "@/server/services/menu/menu.service";
import type {
    FindManyResult,
    PriceRange,
    Pagination,
    OrderBy,
} from "@/server/services/lib/types";

export type MenuListOptions = {
    categoryId?: number | null;
    priceRange?: PriceRange | null;
    pagination?: Pagination | null;
    query?: string | null;
    orderBy?: OrderBy | null;
};

export async function getMenuList(
    opts: MenuListOptions = {},
): Promise<FindManyResult> {
    let svc = menuService();

    if (opts.categoryId) svc = svc.findByCategoryId(opts.categoryId);
    if (opts.priceRange) svc = svc.findByPriceRange(opts.priceRange);
    if (opts.query) svc = svc.searchTerm({ query: opts.query });
    if (opts.pagination) svc = svc.page(opts.pagination);

    const result = (await svc.execute()) as FindManyResult;
    return result;
}
