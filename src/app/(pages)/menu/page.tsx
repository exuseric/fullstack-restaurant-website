import { Menu } from "@/components/features/menu";
import PageHero from "@/components/shared/page-hero/PageHero";
import { urlParamsCache } from "@/lib/url-params";
import { type SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function MenuPage({ searchParams }: PageProps) {
  const filters = urlParamsCache.parse(await searchParams);

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

        <Menu filters={filters} />
      </section>
    </section>
  );
}
export default MenuPage;
