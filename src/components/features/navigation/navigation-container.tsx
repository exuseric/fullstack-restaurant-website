"use client";

import { useMobile } from "@/hooks/use-mobile";
import type { Navigation } from "@/shared/types";
import DesktopNavigation from "@/components/features/navigation/desktop-navigation/desktop-navigation";

export default function NavigationContainer({
  links,
}: {
  links: Navigation[];
}) {
  const isMobile = useMobile();

  if (isMobile === undefined) return null;

  if (isMobile) {
    // You can return your Mobile Nav or null here
    return <></>;
  }

  return <DesktopNavigation links={links} />;
}
