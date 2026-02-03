"use client";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type FilterProviderValues = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
type FilterProviderProps = {
  children: ReactNode;
};

export const FilterContext = createContext<FilterProviderValues | null>(null);

export function FilterProvider(props: FilterProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ isOpen, setIsOpen }}>
      {props.children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return ctx;
}