import { getMenuList } from "@/use-cases/menu";
import { AmountWithCurrency } from "@/lib/format-price";

interface MenuResultsProps {
  filters: {
    category: number[];
    query: string;
    minPrice: number;
    maxPrice: number;
    page: number;
  };
}

export async function MenuResults({ filters }: MenuResultsProps) {
  const menuData = await getMenuList({
    categoryIds: filters.category,
    query: filters.query,
    priceRange: { min: filters.minPrice, max: filters.maxPrice },
    pagination: { page: filters.page, perPage: 12 },
  });

  const products = menuData.items;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {products.length === 0 ? (
        <div className="col-span-full py-20 text-center">
          <p className="text-on-surface text-xl font-semibold">
            No items found
          </p>
          <p className="text-tertiary">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        products.map((item) => (
          <div
            key={item.item.id}
            className="border-outline-variant bg-surface-container-low hover:bg-surface-container-high border p-4 transition-colors"
          >
            <h3 className="text-on-surface font-bold">{item.item.title}</h3>
            <p className="text-on-surface-variant mt-1 line-clamp-2 text-sm">
              {item.item.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-primary font-mono font-medium">
                {AmountWithCurrency(item.item.price ?? 0)}
              </span>
              <span className="text-tertiary bg-surface-container rounded-full px-2 py-1 text-xs">
                {item.category.title}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}