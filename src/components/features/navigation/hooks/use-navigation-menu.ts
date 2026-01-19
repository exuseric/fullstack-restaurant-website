"use client";

import {
  useNavigation,
  type NavigationContextValue,
} from "@/components/features/navigation";

export function useNavigationMenu(): NavigationContextValue {
  const navigationContext = useNavigation();

  return navigationContext;
}
