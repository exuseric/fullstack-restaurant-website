import CategoryFilter from "./features/CategoryFilter";
import type { MenuCategory } from "@/shared/types";
import type { ReactNode } from "react";
import ProductSearch from "./features/ProductSearch";
import { PriceFilter } from "./features/PriceFilter";
import ProductFilter from "./features/ProductFilter";

interface LargeScreenContainerProps {
  categories: MenuCategory[];
  children: ReactNode;
}

function LargeScreenContainer({
  categories,
  children,
}: LargeScreenContainerProps) {
  return (
    <div className="py-container-block md:layout-grid-sidebar relative isolate hidden">
      <aside className="sidebar bg-surface top-nav-lg sticky z-20 h-fit max-h-screen space-y-4 overflow-y-auto overscroll-y-contain p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <ProductSearch />

        <ProductFilter heading="categories">
          <CategoryFilter categories={categories} />
        </ProductFilter>
        <ProductFilter heading="price range">
          <PriceFilter />
        </ProductFilter>
      </aside>

      <div className="content min-h-[150vh]">{children}</div>
    </div>
  );
}

export default LargeScreenContainer;