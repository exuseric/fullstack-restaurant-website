import { useState, useEffect } from "react";

const QUERY = "(max-width: 767px)";

export function useMobile(query = QUERY) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const matches = window.matchMedia(query);
    const updateIsMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    matches.addEventListener("change", updateIsMobile);
    return () => matches.removeEventListener("change", updateIsMobile);
  }, [query]);

  return isMobile;
}
