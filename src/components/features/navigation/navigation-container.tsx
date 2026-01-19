"use client";

import DesktopNavigation from "@/components/features/navigation/desktop-navigation/desktop-navigation";
import { useNavigation } from "./navigation-context";
import MobileNavigation from "./mobile/mobile";

export default function NavigationContainer() {
  const { isMobile } = useNavigation();

  if (isMobile === undefined) return null;

  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}
