"use client";

import { Loader } from "lucide-react";

interface SearchLoadingStateProps {
  query: string;
}

export function SearchLoadingState({ query }: SearchLoadingStateProps) {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start p-4 text-center">
      <span className="flex flex-row items-center justify-start gap-x-2">
        <Loader className="animate-spin duration-700" />
        Searching for &quot;{query}&quot;
      </span>
    </div>
  );
}
