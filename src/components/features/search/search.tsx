"use client";

import { SearchProvider } from "@/components/features/search";
import SearchModal from "./components/modal";

export function Search() {
  return (
    <SearchProvider>
      <SearchModal />
    </SearchProvider>
  );
}
