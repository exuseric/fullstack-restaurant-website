"use client";
import { useMobile } from "@/hooks/use-mobile";
import type { Navigation } from "@/shared/types";
import { getNavigationLinks } from "@/use-cases/navigation";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";

interface NavigationContextValue {
  result: Navigation[];
  isMobile: boolean;
  isFetching: boolean;
}
const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined,
);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a SearchProvider");
  }
  return context;
}

export default function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isMobile = useMobile();

  const { data, isFetching } = useQuery<Navigation[]>({
    queryKey: ["navigation"],
    queryFn: async () => await getNavigationLinks(),
  });

  return (
    <NavigationContext.Provider
      value={{
        result: data ?? [],
        isMobile,
        isFetching,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
