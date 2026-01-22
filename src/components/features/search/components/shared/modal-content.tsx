"use client";

import { Button } from "@/components/shared/Button";
import { SearchField } from "@/components/shared/SearchField";
import type { GroupedSearchResults } from "@/shared/types";
import { Dialog, Heading } from "react-aria-components";
import { SearchResultsList } from "../results-list";
import { SearchLoadingState } from "../loading-state";
import { SearchEmptyState } from "../empty-state";

interface SearchModalContentProps {
  query: string;
  setQuery: (query: string) => void;
  results: GroupedSearchResults;
  hasResults: boolean;
  shouldShowLoading: boolean;
  shouldShowEmptyState: boolean;
  onClose: () => void;
}

export function SearchModalContent({
  query,
  setQuery,
  results,
  hasResults,
  shouldShowLoading,
  shouldShowEmptyState,
  onClose,
}: SearchModalContentProps) {
  return (
    <Dialog className="flex h-full flex-col p-4 outline-none">
      <Heading slot="title" className="mt-0">
        Search our Menu
      </Heading>

      <div className="flex flex-row items-center justify-start gap-x-2">
        <SearchField
          aria-label="Search menu"
          placeholder="Search for food, categories..."
          value={query}
          onChange={setQuery}
          className="w-full"
          autoFocus
        />
        <Button slot="close" onPress={onClose}>
          Cancel
        </Button>
      </div>

      {hasResults && <SearchResultsList results={results} onClose={onClose} />}

      {shouldShowLoading && <SearchLoadingState query={query} />}

      {shouldShowEmptyState && <SearchEmptyState />}
    </Dialog>
  );
}
