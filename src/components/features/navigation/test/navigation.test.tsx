import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavigationProvider, { useNavigation } from "../navigation-context";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the dependencies
vi.mock("@/hooks/use-mobile", () => ({
  useMobile: vi.fn(() => false),
}));

vi.mock("@/use-cases/navigation", () => ({
  getNavigationLinks: vi.fn(() => Promise.resolve([])),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <NavigationProvider>{children}</NavigationProvider>
  </QueryClientProvider>
);

describe("useNavigation", () => {
  it("should throw error when used outside of NavigationRoot", () => {
    expect(() => renderHook(() => useNavigation())).toThrow("useNavigation must be used within a NavigationRoot");
  });

  it("should provide isMenuOpen state and setter", () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });
    
    expect(result.current).toHaveProperty("isMenuOpen");
    expect(result.current).toHaveProperty("setIsMenuOpen");
    expect(typeof result.current.setIsMenuOpen).toBe("function");
    expect(result.current.isMenuOpen).toBe(false);
  });

  it("should allow updating isMenuOpen state", () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });
    
    expect(result.current.isMenuOpen).toBe(false);
    
    act(() => {
      result.current.setIsMenuOpen(true);
    });
    
    expect(result.current.isMenuOpen).toBe(true);
  });
});
