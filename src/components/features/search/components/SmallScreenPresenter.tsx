"use client";

import SmallScreenSheet from "@/components/shared/SmallScreenSheet";
import { useSearch } from "@/components/features/search/SearchContext";
import { SearchModalContent } from "./modal/ModalContent";

export function SmallScreenPresenter() {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <>
      <SmallScreenSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchModalContent />
      </SmallScreenSheet>
    </>
  );
}