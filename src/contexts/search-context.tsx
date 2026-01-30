import { searchAction } from "@/app/actions/search";
import { searchConfig } from "@/components/features/search/lib/search.config";
import type { GroupedSearchResults } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { useDebounce } from "@/hooks/use-debounce";

type SearchValue = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  results: GroupedSearchResults;
  isSearching: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hasResults: boolean;
  shouldShowLoading: boolean;
  shouldShowEmptyState: boolean;
};

export const SearchContext = createContext<SearchValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, searchConfig.debounceMs);

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
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const hasResults =
    (data && (data.categories.length > 0 || data.menuItems.length > 0)) ??
    false;

  const shouldShowLoading =
    isFetching && query.length >= searchConfig.minQueryLength;

  const shouldShowEmptyState =
    !hasResults && !isFetching && query.length >= searchConfig.minQueryLength;

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results: data ?? { menuItems: [], categories: [] },
        isSearching: isFetching,
        isOpen,
        setIsOpen,
        hasResults,
        shouldShowLoading,
        shouldShowEmptyState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
  return ctx;
}