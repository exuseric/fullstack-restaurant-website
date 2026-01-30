import React, { Suspense } from "react";
import { MenuResultsContainer } from "./components/MenuResults/MenuResultsContainer";
import type { MenuCategory } from "@/shared/types";
import { LargeScreenContainer } from "@/components/features/menu/LargeScreenContainer";
import type { URLFilters } from "@/components/features/menu/lib/types";

type MenuContainerProps = {
  categories: MenuCategory[];
  filters: URLFilters
};
export function Menu({ categories, filters }: MenuContainerProps) {
  return (
    <LargeScreenContainer categories={categories}>
      <Suspense
        fallback={
          <div className="text-tertiary animate-pulse py-20 text-center">
            Updating menu results...
          </div>
        }
      >
        <MenuResultsContainer filters={filters} />
      </Suspense>
    </LargeScreenContainer>
  );
}