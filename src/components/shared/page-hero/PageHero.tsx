"use client";
import Image from "next/image";
import { createContext, useContext, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const pageHero = tv({
  slots: {
    root: "layout-grid py-hero-lg bg-surface-container-low min-h-96 relative isolate",
    container: "flex items-center gap-y-4 md:gap-x-2",
    content: "text-center",
    imageWrapper: "",
    heading: "text-6xl max-w-pose text-current",
  },
  variants: {
    variant: {
      horizontal: {
        container: "flex-col md:flex-row-between",
        content: "text-center md:text-left",
        imageWrapper: "relative isolate size-70",
      },
      vertical: {
        root: "h-screen",
        container: "flex-col justify-center gap-y-12",
        imageWrapper: "relative isolate w-full h-70",
      },
      cover: {
        root: "h-screen",
        container: "flex-col justify-center items-start min-h-[inherit]",
        content: "text-left text-surface-variant",
        imageWrapper: "absolute inset-0 -z-10",
        heading: "text-6xl max-w-[15ch]",
      },
    },
  },
  defaultVariants: {
    variant: "horizontal",
  },
});

type PageHeroVariant = VariantProps<typeof pageHero>["variant"];

const PageHeroContext = createContext<{ variant: PageHeroVariant }>({
  variant: "horizontal",
});

type PageHeroProps = {
  children: ReactNode;
  variant?: PageHeroVariant;
};

function PageHeroRoot({ children, variant = "horizontal" }: PageHeroProps) {
  const { root, container } = pageHero({ variant });

  return (
    <PageHeroContext.Provider value={{ variant }}>
      <header className={root()}>
        <div className={container()}>{children}</div>
      </header>
    </PageHeroContext.Provider>
  );
}

type ContentProps = {
  children: ReactNode;
};

export function Content({ children }: ContentProps) {
  const { variant } = useContext(PageHeroContext);
  const { content } = pageHero({ variant });

  return <article className={content()}>{children}</article>;
}

type HeadingProps = {
  children: ReactNode;
};

export function Heading({ children }: HeadingProps) {
  const { variant } = useContext(PageHeroContext);
  const { heading } = pageHero({ variant });
  return <h1 className={heading()}>{children}</h1>;
}

type DescriptionProps = {
  children: ReactNode;
};

export function Description({ children }: DescriptionProps) {
  return <p className="max-w-prose text-current">{children}</p>;
}

type ImageContainerProps = {
  src: string;
  alt: string;
};

export function ImageContainer({ src, alt }: ImageContainerProps) {
  const { variant } = useContext(PageHeroContext);
  const { imageWrapper } = pageHero({ variant });

  return (
    <div className={imageWrapper()}>
      <Image
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        fill={true}
      />
    </div>
  );
}

export const PageHero = Object.assign(PageHeroRoot, {
  Content,
  Heading,
  Description,
  Image: ImageContainer,
});

export default PageHero;