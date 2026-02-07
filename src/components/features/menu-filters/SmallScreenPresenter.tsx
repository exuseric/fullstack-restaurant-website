"use client";

import { useFilter } from "@/components/features/menu-filters/FilterContext";
import { lazy, type ReactNode } from "react";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/shared/button";
import { SheetHeader } from "@/components/shared/SmallScreenSheet";
import { ResetFilters } from "@/components/features/menu-filters/components/ResetFilters";

const SmallScreenSheet = lazy(
  () => import("../../../components/shared/SmallScreenSheet"),
);

export function SmallScreenPresenter({ children }: { children: ReactNode }) {
  const { setIsOpen, isOpen } = useFilter();
  return (
    <>
      <Button
        variant="quiet"
        onPress={() => setIsOpen(true)}
        className="md:hidden"
      >
        <FilterIcon className="size-4" />
        <span>Filter</span>
      </Button>
      <SmallScreenSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <SheetHeader title="Filters">
          <ResetFilters />
        </SheetHeader>
        {children}
      </SmallScreenSheet>
    </>
  );
}