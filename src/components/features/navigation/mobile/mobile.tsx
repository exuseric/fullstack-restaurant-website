import { Search } from "@/components/features/search";
import { Button } from "@/components/shared/Button";
import { Link } from "@/components/shared/Link";
import LogoSvg from "@/components/shared/logo-svg";
import { MapPinIcon, ShoppingCartIcon } from "lucide-react";
import MobileMenu from "./menu";

export default function MobileNavigation() {
  return (
    <header className="glass h-nav-height fixed inset-x-0 bottom-0 z-50 w-full md:hidden">
      <div className="py-safe-bottom container h-full">
        <div className="flex h-full w-full flex-row items-center justify-between gap-x-4">
          <Link
            href="/"
            className="flex h-fit w-fit items-center justify-start gap-x-2 no-underline"
          >
            <span className="icon">
              <LogoSvg />
            </span>
          </Link>

          <MobileMenu />

          <Search />

          <Button variant="quiet">
            <span className="flex flex-col items-center justify-center gap-y-2">
              <MapPinIcon className="size-5" />
              Location
            </span>
          </Button>

          <ShoppingCartIcon className="size-6" />
        </div>
      </div>
    </header>
  );
}
