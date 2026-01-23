"use client";

import LargeScreenSheet from "@/components/shared/LargeScreenSheet";
import { useSearch } from "@/contexts/search-context";
import { SearchModalContent } from "./modal/ModalContent";

export function LargeScreenPresenter() {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <>
      <LargeScreenSheet isOpen={isOpen} setIsOpen={setIsOpen} title="Search Our Menu">
        <SearchModalContent />
      </LargeScreenSheet>
    </>
  );
}
