"use client";
import { throttle, useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/url-params";
import { Loader, Search } from "lucide-react";
import { searchConfig } from "@/components/features/search/lib/search.config";
import { useState, useTransition } from "react";

function ProductSearch() {
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

  const [localSearch, setLocalSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const value = localSearch !== "" ? localSearch : params.query || "";

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    startTransition(() => {
      void setParams({
        query: value || null,
        category: null,
        minPrice: null,
        maxPrice: null,
        page: null,
      }).then(() => {
        setLocalSearch("");
      });
    });
  };

  return (
    <div className="group relative">
      <Search className="text-tertiary group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
      <input
        type="search"
        placeholder="Search menu..."
        className="bg-surface-container focus:border-primary w-full rounded-md border-transparent py-2 pr-4 pl-9 transition-all outline-none focus:ring-0"
        value={value}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {isPending && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <Loader className="text-primary h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default ProductSearch;