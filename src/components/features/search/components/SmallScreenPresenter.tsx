"use client";

import SmallScreenSheet from "@/components/shared/SmallScreenSheet";
import { useSearch } from "@/contexts/search-context";
import { SearchModalContent } from "./modal/ModalContent";

export function SmallScreenPresenter() {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <>
      <SmallScreenSheet isOpen={isOpen} setIsOpen={setIsOpen} title="Search Our Menu">
        <SearchModalContent />
      </SmallScreenSheet>
    </>
  );
}
