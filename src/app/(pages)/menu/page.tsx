import PageHero from "@/components/shared/page-hero/PageHero";
import { type SearchParams } from "nuqs/server";
import ProductsList from "./components/ProductsList";
import { urlParamsCache } from "@/lib/url-params.server";
import { getAllCategories } from "@/use-cases/category";
import { Suspense } from "react";
import { MenuResults } from "./components/MenuResults";

type PageProps = {
  searchParams: Promise<SearchParams>
}

async function MenuPage({ searchParams }: PageProps) {
  const filters = urlParamsCache.parse(await searchParams);
  const categories = await getAllCategories();

  return (
    <section className="menu">
      <PageHero heading="Happy Hour" description="Everyday from 4pm to 7pm" src="https://r6niw2f0z8.ufs.sh/f/tcbNvrChZBJK6bybvAMpIanNzZiHsRMQtC4AockwVLxfTGu1" alt="cocktail" />

      <ProductsList categories={categories}>
        <Suspense fallback={<div className="py-20 text-center text-tertiary animate-pulse">Updating menu results...</div>}>
          <MenuResults filters={filters} />
        </Suspense>
      </ProductsList>
    </section>
  );
}
export default MenuPage