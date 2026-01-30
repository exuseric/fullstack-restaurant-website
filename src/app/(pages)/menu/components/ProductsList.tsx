import LargeScreenContainer from "./LargeScreenContainer";
import type { MenuCategory } from "@/shared/types";
import type { ReactNode } from "react";

interface ProductsListProps {
    categories: MenuCategory[];
    children: ReactNode;
}

async function ProductsList({ categories, children }: ProductsListProps) {

    return (
        <section className="layout-grid py-container-block">
            <h2>Our Menu</h2>

            <LargeScreenContainer categories={categories}>
                {children}
            </LargeScreenContainer>
        </section>
    )
}

export default ProductsList;