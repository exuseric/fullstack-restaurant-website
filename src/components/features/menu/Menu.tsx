import React, { Suspense } from "react";
import { MenuResults } from "./components/MenuResults";
import type { MenuCategory } from "@/shared/types";
import { LargeScreenContainer } from "@/components/features/menu/LargeScreenContainer";

type MenuContainerProps = {
  categories: MenuCategory[];
  filters: {
    category: number[];
    query: string;
    minPrice: number;
    maxPrice: number;
    page: number;
  };
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
        <MenuResults filters={filters} />
      </Suspense>
    </LargeScreenContainer>
  );
}