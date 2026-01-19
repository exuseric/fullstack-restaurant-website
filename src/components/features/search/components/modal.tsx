"use client";

import { Button } from "@/components/shared/Button";
import { useMobile } from "@/hooks/use-mobile";
import { SearchIcon } from "lucide-react";
import { Modal, ModalOverlay } from "react-aria-components";
import { useSearchModal } from "../hooks/use-search-modal";
import { SearchModalContent } from "./shared/modal-content";
import Sheet from "@/components/shared/Sheet";

export default function SearchModal() {
  const {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    hasResults,
    shouldShowLoading,
    shouldShowEmptyState,
  } = useSearchModal();

  const isMobile = useMobile();

  return (
    <>
      <Button variant="quiet" onPress={() => setIsOpen(true)}>
        <span className="flex flex-col items-center justify-center gap-y-2 md:flex-row md:justify-start md:gap-x-2">
          <SearchIcon className="size-4" />
          {isMobile ? "Search" : "Search Our Menu"}
        </span>
      </Button>

      <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchModalContent
          query={query}
          setQuery={setQuery}
          results={results}
          hasResults={hasResults}
          shouldShowLoading={shouldShowLoading}
          shouldShowEmptyState={shouldShowEmptyState}
          onClose={() => setIsOpen(false)}
        />
      </Sheet>
    </>
  );
}
