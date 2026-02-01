"use client";

import { useSearch } from "@/components/features/search/SearchContext";
import { SearchModalContent } from "./modal/ModalContent";
import { lazy, Suspense } from "react";

const LargeScreenSheet = lazy(
  () => import("../../../../components/shared/LargeScreenSheet"),
);

export function LargeScreenPresenter() {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <Suspense>
      <LargeScreenSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Search Our Menu"
      >
        <SearchModalContent />
      </LargeScreenSheet>
    </Suspense>
  );
}
