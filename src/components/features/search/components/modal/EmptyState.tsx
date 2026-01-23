"use client";

import { SearchX } from "lucide-react";

export function SearchEmptyState() {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start p-4 text-center">
      <span className="flex flex-row items-center justify-start gap-x-2">
        <SearchX />
        No results found.
      </span>
    </div>
  );
}
