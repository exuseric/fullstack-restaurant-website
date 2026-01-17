"use client";
import { useMobile } from "@/hooks/use-mobile";
import type { Navigation } from "@/shared/types";
import { getNavigationLinks } from "@/use-cases/navigation";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";

interface NavigationContextValue {
  result: Navigation[];
  isMobile: boolean;
  isFetching: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined,
);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationRoot");
  }
  return context;
}

export function NavigationRoot({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: Navigation[];
}) {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isFetching } = useQuery<Navigation[]>({
    queryKey: ["navigation"],
    queryFn: async () => await getNavigationLinks(),
    initialData,
  });

  return (
    <NavigationContext.Provider
      value={{
        result: data ?? [],
        isMobile: !!isMobile,
        isFetching,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationRoot;