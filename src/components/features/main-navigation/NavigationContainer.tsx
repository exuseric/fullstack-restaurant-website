"use client";
import NavigationProvider from "@/contexts/navigation-context";
import { LargeScreenNavigation } from "./large-screen-navigation/LargeScreenNavigation";
import type { Navigation } from "@/shared/types";
import SmallScreenNavigation from "./small-screen-navigation/SmallScreenNavigation";

type NavigationContainerProps = {
  links: Navigation[];
};

export default function NavigationContainer({
  links,
}: NavigationContainerProps) {
  return (
    <NavigationProvider initialLinks={links}>
      <LargeScreenNavigation />
      <SmallScreenNavigation />
    </NavigationProvider>
  );
}
