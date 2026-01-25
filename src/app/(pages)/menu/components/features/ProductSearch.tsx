"use client";
import { throttle, useQueryStates } from "nuqs";
import type { SearchParamsType } from "@/lib/url-params";
import { searchParamsParsers } from "@/lib/url-params";
import { Search } from "lucide-react";
import { searchConfig } from "@/components/features/search/lib/search.config";

function ProductSearch() {
  const [search, setSearch] = useQueryStates<Partial<SearchParamsType>>(
    {
      query: searchParamsParsers.query,
      page: searchParamsParsers.page,
    },
    {
      shallow: false,
      limitUrlUpdates: throttle(searchConfig.debounceMs),
    },
  );

  return (
    <div className="group relative">
      <Search className="text-tertiary group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
      <input
        type="search"
        placeholder="Search menu..."
        className="bg-surface-container focus:border-primary w-full rounded-md border-transparent py-2 pr-4 pl-9 transition-all outline-none focus:ring-0"
        value={search.query as string}
        onChange={(e) => setSearch({ query: e.target.value, page: 1 })}
      />
    </div>
  );
}

export default ProductSearch;