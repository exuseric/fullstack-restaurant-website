"use client";

import { Button } from "@/components/shared/button";
import { useSearch } from "@/contexts/search-context";
import { SearchField } from "../search-field/SearchField";
import { SearchEmptyState } from "./EmptyState";
import { SearchLoadingState } from "./LoadingState";
import { SearchResultsList } from "./ResultsList";

export function SearchModalContent() {
  const {
    query,
    setQuery,
    setIsOpen,
    hasResults,
    shouldShowLoading,
    shouldShowEmptyState,
  } = useSearch();
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-x-2">
        <SearchField
          aria-label="Search menu"
          placeholder="Search for food, categories..."
          value={query}
          onChange={setQuery}
          className="w-full"
          autoFocus
        />
        <Button slot="close" onPress={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>

      {hasResults && <SearchResultsList />}

      {shouldShowLoading && <SearchLoadingState />}

      {shouldShowEmptyState && <SearchEmptyState />}
    </>
  );
}
