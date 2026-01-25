import CategoryFilter from "./features/CategoryFilter";
import type { MenuCategory } from "@/shared/types";
import type { ReactNode } from "react";
import { Separator } from "@/components/shared/Separator";

interface LargeScreenContainerProps {
    categories: MenuCategory[];
    children: ReactNode;
}

function LargeScreenContainer({ categories, children }: LargeScreenContainerProps) {
    return (
        <div className="py-container-block hidden md:layout-grid-sidebar relative isolate">
            <aside className="sidebar p-4 bg-surface-container-low sticky top-[5rem] z-20 h-fit max-h-screen space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">Filters</h3>
                </div>
                <CategoryFilter categories={categories} heading="Categories" />
                <Separator />
            </aside>

            <div className="content min-h-[150vh]">
                {children}
            </div>
        </div>
    );
}

export default LargeScreenContainer;