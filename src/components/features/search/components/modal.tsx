"use client";

import { Button } from "@/components/shared/button";
import { useMobile } from "@/hooks/use-mobile";
import { SearchIcon } from "lucide-react";
import { Modal, ModalOverlay } from "react-aria-components";
import { useSearchModal } from "../hooks/use-search-modal";
import { SearchModalContent } from "./shared/modal-content";

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

      <ModalOverlay
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isDismissable
        className="entering:animate-in exiting:animate-out entering:fade-in-0 exiting:fade-out-0 glass-frosted fixed inset-0 z-50"
      >
        <Modal className="entering:animate-in exiting:animate-out entering:slide-in-from-bottom exiting:slide-out-to-bottom md:entering:slide-in-from-right-full md:exiting:slide-out-to-right-full bg-surface-background fixed bottom-0 z-50 h-[70vh] w-full pt-4 duration-300 md:inset-y-0 md:right-0 md:h-full md:max-w-md">
          <SearchModalContent
            query={query}
            setQuery={setQuery}
            results={results}
            hasResults={hasResults}
            shouldShowLoading={shouldShowLoading}
            shouldShowEmptyState={shouldShowEmptyState}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      </ModalOverlay>
    </>
  );
}
