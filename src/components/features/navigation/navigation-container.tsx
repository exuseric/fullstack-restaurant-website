"use client";

import DesktopNavigation from "@/components/features/navigation/desktop-navigation/desktop-navigation";
import { useNavigation } from "./navigation-context";

export default function NavigationContainer() {
  const { isMobile } = useNavigation();

  if (isMobile === undefined) return null;

  if (isMobile) {
    // You can return your Mobile Nav or null here
    return <></>;
  }

  return <DesktopNavigation />;
}
