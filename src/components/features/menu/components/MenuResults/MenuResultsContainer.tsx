import { getMenuList } from "@/components/features/menu/lib/fetchMenuItems";
import { MenuResultsList } from "@/components/features/menu/components/MenuResults/MenuResultsList";
import { MENU_CONFIG } from "@/components/features/menu/lib/menu.config";
import type { URLFilters } from "@/components/features/menu/lib/types";

type MenuResultsProps = {
  filters: URLFilters;
}

export async function MenuResultsContainer({ filters }: MenuResultsProps) {
  const initialData = await getMenuList({
    categoryIds: filters.category,
    query: filters.query,
    priceRange: { min: filters.minPrice, max: filters.maxPrice },
    pagination: { page: 1, perPage: MENU_CONFIG.perPage },
  });

  const dehydratedState = {
    pages: [initialData],
    pageParams: [1],
  };

  return (
    <>
      {initialData.items.length === 0 ? (
        <div className="col-span-full py-20 text-center">
          <p className="text-on-surface text-xl font-semibold">
            No items found
          </p>
          <p className="text-tertiary">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <MenuResultsList
          filters={filters}
          initialData={dehydratedState}
        />
      )}
    </>
  );
}