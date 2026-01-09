"use client";

import LogoSvg from "@/components/shared/logo-svg";
import { useScroll } from "@/hooks/useScoll";
import type { Navigation } from "@/shared/types";
import { ShoppingCartIcon } from "lucide-react";
import DesktopNavMenu from "./desktop-nav-menu";
import Link from "next/link";

export default function DesktopNavigation({ links }: { links: Navigation[] }) {
  const isScrolled = useScroll(10);

  return (
    <header
      className={`text-foreground h-nav-height ${isScrolled ? "glass-frosted" : "glass"} fixed inset-x-0 top-0 z-50`}
    >
      <div className="container h-full">
        <div className="grid h-full w-full grid-cols-[auto_1fr_auto] gap-x-2">
          <Link
            href="/"
            className="flex w-fit items-center justify-start gap-x-2 no-underline"
          >
            <LogoSvg />
            <span className="text-primary text-xl font-bold">Restaurant</span>
          </Link>
          <div className="flex w-full justify-center">
            <DesktopNavMenu links={links} />
          </div>
          <div className="flex w-fit items-center justify-end">
            <ShoppingCartIcon className="size-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
