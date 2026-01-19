"use client";

import LogoSvg from "@/components/shared/logo-svg";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import DesktopNavMenu from "./desktop-nav-menu";
import { Search } from "@/components/features/search";

export default function DesktopNavigation() {
  return (
    <header className="text-foreground h-nav-height glass fixed inset-x-0 top-0 z-50">
      <div className="container h-full">
        <div className="grid h-full w-full grid-cols-[auto_1fr_auto] gap-x-2">
          <Link
            href="/"
            className="flex w-full items-center justify-start gap-x-2 no-underline"
          >
            <span className="icon">
              <LogoSvg />
            </span>
            <span className="text-primary text-xl font-bold">Restaurant</span>
          </Link>
          <div className="flex w-full justify-center">
            <DesktopNavMenu />
          </div>
          <div className="flex w-fit items-center justify-end">
            <Search />
            <ShoppingCartIcon className="size-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
