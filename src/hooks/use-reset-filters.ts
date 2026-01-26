// hooks/useResetFilters.ts
import { useQueryState } from "nuqs";
import type { SearchParamsKeys } from "@/lib/url-params";

export function useResetFilters() {
  const [, setCategory] = useQueryState("category");
  const [, setQuery] = useQueryState("query");
  const [, setMinPrice] = useQueryState("minPrice");
  const [, setMaxPrice] = useQueryState("maxPrice");
  const [, setPage] = useQueryState("page");

  const resetFilters = async (filter: SearchParamsKeys[] | null = null) => {
    const resetFunctions: Record<
      SearchParamsKeys,
      () => Promise<URLSearchParams>
    > = {
      category: () => setCategory(null),
      query: () => setQuery(null),
      minPrice: () => setMinPrice(null),
      maxPrice: () => setMaxPrice(null),
      page: () => setPage(null),
    };

    if (!filter || filter.length === 0) {
      // Reset all filters
      await Promise.all(Object.values(resetFunctions).map((fn) => fn()));
    } else {
      // Reset specific filters in the array
      await Promise.all(filter.map((key) => resetFunctions[key]?.()));
    }
  };

  return { resetFilters };
}