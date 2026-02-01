"use client";

import { SearchProvider } from "@/components/features/search/SearchContext";
import SearchContainer from "./SearchContainer";

export function GlobalSearch() {
  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
}
