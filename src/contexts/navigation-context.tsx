"use client";

import { useMobile } from "@/hooks/use-mobile";
import type { Navigation } from "@/shared/types";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";

type NavigationValue = {
  links: Navigation[];
  isMobile: boolean;
  dropdownOpen: boolean;
  mobileMenuOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
  initialLinks: Navigation[];
};

export const NavigationContext = createContext<NavigationValue | undefined>(
  undefined,
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }
  return context;
};

export default function NavigationProvider({ children, initialLinks }: Props) {
  const isMobile = useMobile();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <NavigationContext.Provider
      value={{
        isMobile,
        links: initialLinks ?? [],
        dropdownOpen,
        setDropdownOpen,
        dropdownRef,
        mobileMenuOpen,
        setMobileMenuOpen
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
