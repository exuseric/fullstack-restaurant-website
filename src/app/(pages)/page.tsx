import PageHero, {
  Content,
  Heading,
  Description,
  ImageContainer as Image,
} from "@/components/shared/page-hero/PageHero";

export default function HomePage() {
  return (
    <>
      <PageHero variant="cover">
        <Content>
          <Heading>Welcome to Our Kitchen</Heading>
          <Description>
            Experience the finest flavors and freshest ingredients in town.
          </Description>
        </Content>
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1170&auto=format&fit=crop"
          alt="Restaurant Interior"
        />
      </PageHero>
    </>
  );
}
