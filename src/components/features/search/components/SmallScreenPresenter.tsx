"use client";

import { Button } from "@/components/shared/Button";
import SmallScreenSheet from "@/components/shared/SmallScreenSheet";
import { useSearch } from "@/contexts/search-context";
import { SearchIcon } from "lucide-react";
import { SearchModalContent } from "./modal/ModalContent";

export function SmallScreenPresenter() {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <>
      <Button
        variant="quiet"
        onPress={() => setIsOpen(true)}
        aria-label="Search menu"
      >
        <SearchIcon className="size-5" />
      </Button>

      <SmallScreenSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchModalContent />
      </SmallScreenSheet>
    </>
  );
}
