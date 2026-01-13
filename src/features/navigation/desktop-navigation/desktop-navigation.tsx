import LogoSvg from "@/components/shared/logo-svg";
import type { Navigation } from "@/shared/types";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import DesktopNavMenu from "./desktop-nav-menu";

export default function DesktopNavigation({ links }: { links: Navigation[] }) {
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
            <span className="text-xl font-bold">Restaurant</span>
          </Link>
          <div className="flex w-full justify-center">
            <DesktopNavMenu links={links} />
          </div>
          <div className="flex w-fit items-center justify-end gap-x-2">
            <SearchIcon className="size-4" />
            <ShoppingCartIcon className="size-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
