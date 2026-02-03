import PageHero, {
  Content,
  Description,
  Heading,
  ImageContainer as Image,
} from "@/components/shared/page-hero/PageHero";
import { urlParamsCache } from "@/lib/url-params";
import { type SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { MenuResultsContainer } from "@/components/features/menu/MenuResultsContainer";
import { MenuFilter } from "@/components/features/menu-filters/MenuFilter";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function MenuPage({ searchParams }: PageProps) {
  const filters = urlParamsCache.parse(await searchParams);

  return (
    <>
      <PageHero>
        <Content>
          <Heading>Happy Hour</Heading>
          <Description>Everyday from 4pm to 7pm</Description>
        </Content>
        <Image
          src="https://r6niw2f0z8.ufs.sh/f/tcbNvrChZBJK6bybvAMpIanNzZiHsRMQtC4AockwVLxfTGu1"
          alt="cocktail"
        />
      </PageHero>

      <section className="layout-grid py-container-block">
        <h2>Our Menu</h2>

        <div className="py-container-block md:layout-grid-sidebar relative isolate">
          <MenuFilter />

          <div className="max-sm:wide content min-h-[150vh]">
            <Suspense
              fallback={
                <div className="text-tertiary animate-pulse py-20 text-center">
                  Updating menu results...
                </div>
              }
            >
              <MenuResultsContainer filters={filters} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
export default MenuPage;