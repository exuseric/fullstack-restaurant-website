"use client";

import { useMobile } from "@/hooks/use-mobile";
import { SearchPresenterDesktop } from "./components/presenter-desktop";
import { SearchPresenterMobile } from "./components/presenter-mobile";
import { SearchProvider } from "@/components/features/search";

export function Search() {
  const isMobile = useMobile();

  return (
    <SearchProvider>
      {isMobile ? <SearchPresenterMobile /> : <SearchPresenterDesktop />}
    </SearchProvider>
  );
}
