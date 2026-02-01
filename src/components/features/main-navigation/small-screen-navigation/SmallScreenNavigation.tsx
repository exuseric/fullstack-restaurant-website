import LogoLink from "@/components/shared/LogoLink";
import { GlobalSearch } from "@/components/features/search/GlobalSearch";
import { Button } from "@/components/shared/button";
import { MenuIcon } from "lucide-react";
import { useNavigation } from "@/contexts/navigation-context";
import MobileMenu from "./components/MobileMenu";
import { lazy, Suspense } from "react";

const SmallScreenSheet = lazy(
  () => import("../../../../components/shared/SmallScreenSheet"),
);

function SmallScreenNavigation() {
  const { setMobileMenuOpen, mobileMenuOpen } = useNavigation();
  return (
    <header className="p-safe-top fixed inset-x-0 top-0 z-50 w-full md:hidden">
      <div className="flex-row-between min-h-nav-sm glass-frosted h-full w-full items-center gap-x-1 overflow-hidden p-2">
        <LogoLink />
        <div className="action-buttons flex-row-between items-center gap-x-1">
          <GlobalSearch />
          <Button
            variant="quiet"
            onPress={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
      <Suspense>
        <SmallScreenSheet
          isOpen={mobileMenuOpen}
          setIsOpen={setMobileMenuOpen}
          title="Menu"
        >
          <MobileMenu />
        </SmallScreenSheet>
      </Suspense>
    </header>
  );
}

export default SmallScreenNavigation;
