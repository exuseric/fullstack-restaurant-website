"use client";

import { searchAction } from "@/app/actions/search";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import type { GroupedSearchResults } from "@/shared/types";
import { searchConfig } from "@/components/features/search/lib/search.config";

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  results: GroupedSearchResults;
  isSearching: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Custom debounce for query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, searchConfig.debounceMs);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isFetching } = useQuery<GroupedSearchResults>({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      const data = await searchAction(debouncedQuery);
      console.log(data);
      return {
        menuItems: data.menuItems.map((i) => ({
          ...i,
          type: "menu_item" as const,
        })),
        categories: data.categories.map((i) => ({
          ...i,
          type: "category" as const,
        })),
      };
    },
    // Only fetch if query is long enough
    enabled: debouncedQuery.length >= searchConfig.minQueryLength,
    staleTime: 1 * 60 * 1000, // Cache data for 1 minute
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
  });

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results: data ?? { menuItems: [], categories: [] },
        isSearching: isFetching,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
