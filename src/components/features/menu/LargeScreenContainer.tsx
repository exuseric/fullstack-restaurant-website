import { CategoryFilter } from "./components/CategoryFilter";
import type { MenuCategory } from "@/shared/types";
import type { ReactNode } from "react";
import { ProductSearch } from "./components/ProductSearch";
import { PriceFilter } from "./components/PriceFilter";
import { ProductFilter } from "./components/ProductFilter";
import { ResetFilters } from "./components/ResetFilters";

interface LargeScreenContainerProps {
  categories: MenuCategory[];
  children: ReactNode;
}

export function LargeScreenContainer({
  categories,
  children,
}: LargeScreenContainerProps) {
  return (
    <div className="py-container-block md:layout-grid-sidebar relative isolate hidden">
      <aside className="sidebar bg-surface top-nav-lg sticky z-20 h-fit max-h-[90svh] space-y-4 overflow-y-auto overscroll-y-contain p-4">
        <div className="mb-4 flex-row-between items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          <ResetFilters />
        </div>
        <ProductSearch />

        <ProductFilter heading="categories">
          <CategoryFilter categories={categories} />
        </ProductFilter>
        <ProductFilter heading="price range">
          <PriceFilter />
        </ProductFilter>
      </aside>

      <div className="content min-h-[150vh]">
        {children}
      </div>
    </div>
  );
}