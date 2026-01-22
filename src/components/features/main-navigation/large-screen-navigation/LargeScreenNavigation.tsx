import { Search } from "@/components/features/search";
import LogoLink from "@/components/shared/LogoLink";
import Menu from "./components/Menu";
import { useNavigation } from "@/contexts/navigation-context";

export function LargeScreenNavigation() {
  const { dropdownRef } = useNavigation();
  return (
    <header
      className="text-on-surface fixed inset-x-0 top-2 z-50"
      ref={dropdownRef}
    >
      <div className="glass-frosted flex-row-between min-h-nav-height-sm mx-auto max-w-1/2 items-center overflow-hidden p-1">
        <LogoLink />
        <Menu />
        <Search />
      </div>
    </header>
  );
}
