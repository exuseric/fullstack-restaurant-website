"use client";

import { useMobile } from "@/hooks/use-mobile";
import DesktopNavigation from "@/components/features/navigation/desktop-navigation/desktop-navigation";

export default function NavigationContainer() {
  const isMobile = useMobile();

  if (isMobile === undefined) return null;

  if (isMobile) {
    // You can return your Mobile Nav or null here
    return <></>;
  }

  return <DesktopNavigation />;
}
