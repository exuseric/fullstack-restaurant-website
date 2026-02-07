import { ProductFilter } from "@/components/features/menu-filters/components/ProductFilter";
import { CategoryFilter } from "@/components/features/menu-filters/filters/category-filter/CategoryFilter";
import { PriceFilter } from "@/components/features/menu-filters/filters/price-filter/PriceFilter";
import { ProductSearch } from "@/components/features/menu-filters/components/ProductSearch";

export function Filters() {
  return (
    <div className="space-y-4 py-4">
      <ProductSearch />
      <ProductFilter heading="categories">
        <CategoryFilter />
      </ProductFilter>
      <PriceFilter />
    </div>
  );
}