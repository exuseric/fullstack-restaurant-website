import { useInfiniteQuery } from "@tanstack/react-query";
import { getMenuListAction } from "@/components/features/menu/actions/menu.actions";
import type { URLFilters } from "../lib/types";
import { MENU_CONFIG } from "../lib/menu.config";

export function useMenuInfiniteQuery(filters: URLFilters, initialData?: any) {
  return useInfiniteQuery({
    queryKey: ["menu", filters],
    queryFn: ({ pageParam = 1 }) =>
      getMenuListAction({
        categoryIds: filters.category,
        query: filters.query,
        priceRange: { min: filters.minPrice, max: filters.maxPrice },
        pagination: { page: pageParam, perPage: MENU_CONFIG.perPage },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialData,
  });
}