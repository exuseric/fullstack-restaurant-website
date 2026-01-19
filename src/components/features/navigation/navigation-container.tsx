"use client";

import DesktopNavigation from "@/components/features/navigation/desktop-navigation/desktop-navigation";
import MobileNavigation from "./mobile/mobile";
import NavigationProvider from "./navigation-context";
import type { Navigation as NavigationType } from "@/shared/types";

interface NavigationProps {
  initialLinks: NavigationType[];
}
export default function NavigationContainer({ initialLinks }: NavigationProps) {
  return (
    <NavigationProvider initialLinks={initialLinks}>
      <DesktopNavigation />
      <MobileNavigation />
    </NavigationProvider>
  );
}
