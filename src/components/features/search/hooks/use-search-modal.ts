"use client";

import { useSearch } from "@/components/features/search";
import { searchConfig } from "@/components/features/search/lib/search.config";

export function useSearchModal() {
  const searchContext = useSearch();

  const hasResults =
    searchContext.results.menuItems.length > 0 ||
    searchContext.results.categories.length > 0;

  const shouldShowLoading =
    searchContext.isSearching &&
    searchContext.query.length >= searchConfig.minQueryLength;

  const shouldShowEmptyState =
    !hasResults &&
    !searchContext.isSearching &&
    searchContext.query.length >= searchConfig.minQueryLength;

  return {
    ...searchContext,
    hasResults,
    shouldShowLoading,
    shouldShowEmptyState,
  };
}
