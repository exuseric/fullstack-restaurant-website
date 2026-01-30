import { getMenuList } from "@/components/features/menu/lib/fetchMenuItems";
import { MenuResultsList } from "@/components/features/menu/components/MenuResults/MenuResultsList";
import { MENU_CONFIG } from "@/components/features/menu/lib/menu.config";
import type { URLFilters } from "@/components/features/menu/lib/types";

type MenuResultsProps = {
  filters: URLFilters;
}

export async function MenuResultsContainer({ filters }: MenuResultsProps) {
  const menuData = await getMenuList({
    categoryIds: filters.category,
    query: filters.query,
    priceRange: { min: filters.minPrice, max: filters.maxPrice },
    pagination: { page: filters.page, perPage: MENU_CONFIG.perPage },
  });

  const items = menuData.items;

  console.log({page: menuData.page, totalPages: menuData.totalPages, totalCount: menuData.totalCount})

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.length === 0 ? (
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
          items={items}
          filters={filters}
          page={menuData.page}
          totalPages={menuData.totalPages}
          totalCount={menuData.totalCount}
        />
      )}
    </div>
  );
}