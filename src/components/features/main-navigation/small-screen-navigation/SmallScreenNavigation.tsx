import LogoLink from "@/components/shared/LogoLink";
import { Search } from "@/components/features/search";
import { Button } from "@/components/shared/button";
import { MenuIcon } from "lucide-react";
import { useNavigation } from "@/contexts/navigation-context";
// import SmallScreenSheet from "@/components/shared/SmallScreenSheet";
import MobileMenu from "./components/Menu";
import { lazy, Suspense } from "react";

const SmallScreenSheet = lazy(() => import("../../../../components/shared/SmallScreenSheet"));

function SmallScreenNavigation() {
    const { setMobileMenuOpen, mobileMenuOpen } = useNavigation()
    return (
        <header className="md:hidden fixed inset-x-0 top-0 w-full p-safe-top z-50">
            <div className="w-full h-full flex-row-between items-center gap-x-1 p-2  min-h-nav-sm glass-frosted overflow-hidden">
                <LogoLink />
                <div className="action-buttons flex-row-between items-center gap-x-1">
                    <Search />
                    <Button variant="quiet" onPress={() => setMobileMenuOpen(true)}>
                        <MenuIcon />
                    </Button>
                </div>
            </div>
            <Suspense>
                <SmallScreenSheet isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} title="Menu">
                    <MobileMenu />
                </SmallScreenSheet>
            </Suspense>
        </header>
    );
}

export default SmallScreenNavigation;