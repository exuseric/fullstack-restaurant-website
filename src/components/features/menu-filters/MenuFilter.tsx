import { FilterProvider } from "@/components/features/menu-filters/FilterContext";
import { FiltersContainer } from "@/components/features/menu-filters/FiltersContainer";

export function MenuFilter() {
  return (
    <FilterProvider>
      <FiltersContainer />
    </FilterProvider>
  );
}