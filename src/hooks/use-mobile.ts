import { useState, useEffect } from "react";

const QUERY = "(max-width: 767px)";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const matches = window.matchMedia(QUERY);
    const updateIsMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    matches.addEventListener("change", updateIsMobile);
    return () => matches.removeEventListener("change", updateIsMobile);
  }, []);

  return isMobile;
}
