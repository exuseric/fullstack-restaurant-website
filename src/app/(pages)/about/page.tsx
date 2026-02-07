import PageHero, {
  Content,
  Heading,
  Description,
  ImageContainer,
} from "@/components/shared/page-hero/PageHero";

export default function AboutPage() {
  return (
    <section className="about">
      <PageHero variant="vertical">
        <Content>
          <Heading>Our Story</Heading>
          <Description>
            Crafting exceptional culinary experiences since 2010.
          </Description>
        </Content>
        <ImageContainer
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1170&auto=format&fit=crop"
          alt="About Us"
        />
      </PageHero>
      <section className="layout-grid py-container-block overflow-hidden">
        <article className="mx-auto h-80 max-w-3xl from-10% p-12 text-center">
          <h2 className="font-heading mb-6 text-3xl">Passion on Every Plate</h2>
          <p className="mb-4 text-lg">
            Founded with a vision to bring fresh, locally-sourced ingredients to
            your table, our restaurant has become a cornerstone of the
            community. We believe that great food is about more than just taste,
            it&apos;s about the memories created around the table.
          </p>
          <p className="text-lg">
            Our team of expert chefs works tirelessly to innovate and refine our
            menu, ensuring that every visit is a unique and delightful
            experience.
          </p>
        </article>
      </section>
    </section>
  );
}