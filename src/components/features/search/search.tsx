"use client";

import { useMobile } from "@/hooks/use-mobile";
import { LargeScreenPresenter } from "./components/LargeScreenPresenter";
import { SmallScreenPresenter } from "./components/SmallScreenPresenter";
import { SearchProvider } from "@/contexts/search-context";

export function Search() {
  const isMobile = useMobile();

  return (
    <SearchProvider>
      {isMobile ? <SmallScreenPresenter /> : <LargeScreenPresenter />}
    </SearchProvider>
  );
}
