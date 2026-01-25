import CategoryFilter from "./features/CategoryFilter";
import type { MenuCategory } from "@/shared/types";
import type { ReactNode } from "react";
import { Separator } from "@/components/shared/Separator";
import ProductSearch from "./features/ProductSearch";

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
      <aside className="sidebar bg-surface-container-low sticky top-[5rem] z-20 h-fit max-h-screen space-y-4 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <ProductSearch />
        <CategoryFilter categories={categories} heading="Categories" />
        <Separator />
      </aside>

      <div className="content min-h-[150vh]">{children}</div>
    </div>
  );
}

export default LargeScreenContainer;