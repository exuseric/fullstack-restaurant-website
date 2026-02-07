import { useState, useEffect } from "react";

const BREAKPOINT = 768;

export function useMobile(breakpoint = BREAKPOINT) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const matches = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    matches.addEventListener("change", onChange);
    onChange();
    return () => matches.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}