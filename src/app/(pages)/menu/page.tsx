import PageHero from "@/components/shared/page-hero/PageHero";
import { type SearchParams } from "nuqs/server";
// import { ProductsList } from "@/components/features/menu";
import { urlParamsCache } from "@/lib/url-params";
import { getAllCategories } from "@/use-cases/category";
import { Suspense } from "react";
// import { MenuResults } from "@/components/features/menu";
import { Menu } from "@/components/features/menu";
import { LargeScreenContainer } from "@/components/features/menu/LargeScreenContainer";

type PageProps = {
  searchParams: Promise<SearchParams>
}

async function MenuPage({ searchParams }: PageProps) {
  const filters = urlParamsCache.parse(await searchParams);
  const categories = await getAllCategories();

  return (
    <section className="menu">
      <PageHero
        heading="Happy Hour"
        description="Everyday from 4pm to 7pm"
        src="https://r6niw2f0z8.ufs.sh/f/tcbNvrChZBJK6bybvAMpIanNzZiHsRMQtC4AockwVLxfTGu1"
        alt="cocktail"
      />
      <section className="layout-grid py-container-block">
        <h2>Our Menu</h2>

        <Menu categories={categories} filters={filters} />
      </section>

      {/*<ProductsList categories={categories}>*/}
      {/*  <Suspense fallback={<div className="py-20 text-center text-tertiary animate-pulse">Updating menu results...</div>}>*/}
      {/*    <MenuResults filters={filters} />*/}
      {/*  </Suspense>*/}
      {/*</ProductsList>*/}
    </section>
  );
}
export default MenuPage