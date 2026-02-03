"use client";

import { SearchProvider } from "@/components/features/search/SearchContext";
import SearchContainer from "./SearchContainer";

type GlobalSearchProps = {
  showButtonTextOnMobile?: boolean;
};
export function GlobalSearch({ showButtonTextOnMobile }: GlobalSearchProps) {
  return (
    <SearchProvider showButtonText={showButtonTextOnMobile}>
      <SearchContainer />
    </SearchProvider>
  );
}