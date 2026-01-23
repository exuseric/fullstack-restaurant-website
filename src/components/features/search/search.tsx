"use client";

import { SearchProvider } from "@/contexts/search-context";
import { useMobile } from "@/hooks/use-mobile";
import SearchContainer from "./SearchContainer";

export function Search() {

  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
}
