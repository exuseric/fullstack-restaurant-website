import { ResetFilters } from "@/components/features/menu-filters/components/ResetFilters";
import { ProductSearch } from "@/components/features/menu-filters/components/ProductSearch";
import { ProductFilter } from "@/components/features/menu-filters/components/ProductFilter";
import { CategoryFilter } from "@/components/features/menu-filters/filters/category-filter/CategoryFilter";
import { PriceFilter } from "@/components/features/menu-filters/filters/price-filter/PriceFilter";

export function LargeScreenPresenter() {
  return (
    <aside className="sidebar bg-surface top-nav-lg sticky z-20 h-fit max-h-[90svh] space-y-4 overflow-y-auto overscroll-y-contain p-4">
      <div className="flex-row-between bg-surface sticky top-0 z-10 mb-4 w-full items-center">
        <h3 className="my-0! text-lg font-semibold">Filters</h3>
        <ResetFilters />
      </div>
      <ProductSearch />

      <ProductFilter heading="categories">
        <CategoryFilter />
      </ProductFilter>
      <PriceFilter />
    </aside>
  );
}