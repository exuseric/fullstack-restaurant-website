"use client";

import { SearchProvider } from "@/contexts/search-context";
import SearchContainer from "./SearchContainer";

export function Search() {
  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
}