import { useQueryStates } from "nuqs";
import { type SearchParamsKeys, searchParamsParsers } from "@/lib/url-params";

export function useResetFilters() {
  const [, setParams] = useQueryStates(searchParamsParsers, {
    shallow: false,
  });

  const resetFilters = async (keys: SearchParamsKeys[] | null = null) => {
    if (!keys || keys.length === 0) {
      // Reset all filters
      await setParams({
        category: null,
        query: null,
        minPrice: null,
        maxPrice: null,
        page: null,
      });
    } else {
      // Reset specific filters
      const resetObject = keys.reduce(
        (acc, key) => {
          acc[key] = null;
          return acc;
        },
        {} as Partial<Record<SearchParamsKeys, null>>,
      );
      await setParams(resetObject);
    }
  };

  return { resetFilters };
}