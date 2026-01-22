"use client";

import { Button } from "@/components/shared/Button";
import { useSearch } from "@/contexts/search-context";
import { SearchIcon } from "lucide-react";
import { Modal, ModalOverlay } from "react-aria-components";
import { SearchModalContent } from "./modal/ModalContent";
import LargeScreenSheet from "@/components/shared/LargeScreenSheet";

export function LargeScreenPresenter() {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <>
      <Button variant="quiet" onPress={() => setIsOpen(true)}>
        <span className="flex flex-row items-center justify-start gap-x-2">
          <SearchIcon className="size-4" />
          Search our Menu
        </span>
      </Button>

      <LargeScreenSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchModalContent />
      </LargeScreenSheet>
    </>
  );
}
