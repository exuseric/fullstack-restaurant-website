"use client";

import { useSearch } from "@/contexts/search-context";
import { Loader } from "lucide-react";

interface SearchLoadingStateProps {
  message?: string;
}

export function SearchLoadingState({ message }: SearchLoadingStateProps) {
  const { query } = useSearch();
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start p-4 text-center">
      <span className="flex flex-row items-center justify-start gap-x-2">
        <Loader className="animate-spin duration-700" />
        {message ?? `Searching for &quot;${query}&quot;`}
      </span>
    </div>
  );
}
