"use client";
import { throttle, useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { searchConfig } from "@/components/features/search/lib/search.config";
import { useState, useTransition } from "react";
import { SearchField } from "@/components/shared/search-field/SearchField";

export function ProductSearch() {
  const [params, setParams] = useQueryStates(
    {
      query: searchParamsParsers.query,
      category: searchParamsParsers.category,
      minPrice: searchParamsParsers.minPrice,
      maxPrice: searchParamsParsers.maxPrice,
      page: searchParamsParsers.page,
    },
    {
      shallow: false,
      limitUrlUpdates: throttle(searchConfig.debounceMs),
    },
  );

  const [localSearch, setLocalSearch] = useState(params.query || "");
  const [prevQuery, setPrevQuery] = useState(params.query);
  const [isPending, startTransition] = useTransition();

  if (params.query !== prevQuery) {
    setPrevQuery(params.query);
    setLocalSearch(params.query || "");
  }

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    startTransition(() => {
      void setParams({
        query: value || null,
        category: null,
        minPrice: null,
        maxPrice: null,
        page: null,
      });
    });
  };

  return (
    <div className="group relative">
      <SearchField
        value={localSearch}
        onChange={handleSearchChange}
        className="w-full"
        isPending={isPending}
      />
    </div>
  );
}