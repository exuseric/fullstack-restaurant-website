import Image from "next/image";

type PageHeroProps = {
    heading: string;
    description: string;
    src: string;
    alt: string;
}


function PageHero({ heading, description, src, alt }: PageHeroProps) {
    return (<header className="layout-grid py-hero-lg min-h-96 bg-surface-container-low text-on-surface">
        <div className="flex flex-col gap-y-4 md:flex-row-between items-center md:gap-x-2">
            <article className="text-center md:text-left">
                <h1 className="text-6xl">
                    {heading}
                </h1>
                <p>{description}</p>
            </article>

            <div className="size-70 relative isolate">
                <Image
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                    fill={true}
                />
            </div>
        </div>
    </header>);
}

export default PageHero;