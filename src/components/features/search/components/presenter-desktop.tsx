"use client";

import { Button } from "@/components/shared/Button";
import { SearchIcon } from "lucide-react";
import { Modal, ModalOverlay } from "react-aria-components";
import { useSearchModal } from "../hooks/use-search-modal";
import { SearchModalContent } from "./shared/modal-content";

export function SearchPresenterDesktop() {
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
      <Button variant="quiet" onPress={() => setIsOpen(true)}>
        <span className="flex flex-row items-center justify-start gap-x-2">
          <SearchIcon className="size-4" />
          Search our Menu
        </span>
      </Button>

      <ModalOverlay
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isDismissable
        className="entering:animate-in exiting:animate-out entering:fade-in-0 exiting:fade-out-0 glass-frosted fixed inset-0 z-50"
      >
        <Modal className="entering:animate-in exiting:animate-out entering:slide-in-from-right-full exiting:slide-out-to-right-full bg-surface fixed top-0 right-0 z-50 h-full w-full max-w-md shadow-lg duration-300">
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
