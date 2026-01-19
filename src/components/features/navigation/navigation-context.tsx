"use client";

import { useMobile } from "@/hooks/use-mobile";
import type { Navigation } from "@/shared/types";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface NavigationContextValue {
  result: Navigation[];
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined,
);

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
  initialLinks: Navigation[];
}

export default function NavigationProvider({
  children,
  initialLinks,
}: NavigationProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <NavigationContext.Provider
      value={{
        result: initialLinks,
        isMobile,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
