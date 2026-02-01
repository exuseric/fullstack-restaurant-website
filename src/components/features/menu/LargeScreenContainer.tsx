import type { ReactNode } from "react";
import { CategoryFilter } from "./components/CategoryFilter/CategoryFilter";
import { PriceFilter } from "./components/PriceFilter/PriceFilter";
import { ProductFilter } from "./components/ProductFilter";
import { ProductSearch } from "./components/ProductSearch";
import { ResetFilters } from "./components/ResetFilters";

interface LargeScreenContainerProps {
  children: ReactNode;
}

export function LargeScreenContainer({ children }: LargeScreenContainerProps) {
  return (
    <div className="py-container-block md:layout-grid-sidebar relative isolate hidden">
      <aside className="sidebar bg-surface top-nav-lg sticky z-20 h-fit max-h-[90svh] space-y-4 overflow-y-auto overscroll-y-contain p-4">
        <div className="flex-row-between bg-surface sticky top-0 z-10 mb-4 w-full items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          <ResetFilters />
        </div>
        <ProductSearch />

        <ProductFilter heading="categories">
          <CategoryFilter />
        </ProductFilter>
        <ProductFilter heading="price range">
          <PriceFilter />
        </ProductFilter>
      </aside>

      <div className="content min-h-[150vh]">{children}</div>
    </div>
  );
}
