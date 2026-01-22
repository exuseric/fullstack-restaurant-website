"use client";

import { Button } from "@/components/shared/button";
import LargeScreenSheet from "@/components/shared/LargeScreenSheet";
import { useSearch } from "@/contexts/search-context";
import { SearchIcon } from "lucide-react";
import { SearchModalContent } from "./modal/ModalContent";

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
