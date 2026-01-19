import "@/styles/globals.css";

import { type Metadata } from "next";
import { Cambo, IBM_Plex_Sans } from "next/font/google";
import Providers from "@/app/providers/providers";
import { Button } from "@/components/shared/Button";
import Link from "next/link";
import Navigation from "@/components/features/navigation/navigation";

export const metadata: Metadata = {
  title: "Restaurant",
  description:
    "A fullstack restaurant website built with Next.js and Drizzle ORM",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const headings = Cambo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const content = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-content",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${headings.variable} ${content.variable}`}>
      <Providers>
        <body>
          <Button className="absolute top-2 left-2 z-999 -translate-y-[150%] focus-visible:translate-y-0">
            <Link href="#main-content">Skip to main content</Link>
          </Button>
          <Navigation />
          <main id="main-content">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
