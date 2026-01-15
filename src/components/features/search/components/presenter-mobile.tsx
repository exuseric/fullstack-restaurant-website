"use client";

import { Button } from "@/components/shared/button";
import { SearchIcon } from "lucide-react";
import { Modal, ModalOverlay } from "react-aria-components";
import { useSearchModal } from "../hooks/use-search-modal";
import { SearchModalContent } from "./shared/modal-content";

export function SearchPresenterMobile() {
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

  return (
    <>
      <Button
        variant="quiet"
        onPress={() => setIsOpen(true)}
        aria-label="Search menu"
      >
        <SearchIcon className="size-5" />
      </Button>

      <ModalOverlay
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isDismissable
        className="entering:animate-in exiting:animate-out entering:fade-in-0 exiting:fade-out-0 glass-frosted fixed inset-0 z-50"
      >
        <Modal className="entering:animate-in exiting:animate-out entering:slide-in-from-bottom exiting:slide-out-to-bottom bg-surface-background fixed right-0 bottom-0 left-0 z-50 h-[85vh] rounded-t-2xl shadow-lg duration-300">
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
