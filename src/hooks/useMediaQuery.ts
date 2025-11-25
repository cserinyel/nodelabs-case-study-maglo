import { useState, useEffect } from "react";

/**
 * Tailwind CSS breakpoints
 * xs: 375px
 * sm: 640px
 * md: 768px
 * lg: 1024px
 * xl: 1280px
 * 2xl: 1440px
 */
const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * Hook to track media query breakpoints
 * @param breakpoint - The breakpoint to track (xs, sm, md, lg, xl, 2xl)
 * @param direction - 'min' for min-width (default) or 'max' for max-width
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (
  breakpoint: Breakpoint,
  direction: "min" | "max" = "min"
): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const width = breakpoints[breakpoint];
    const query = `(min-width: ${width}px)`;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const width = breakpoints[breakpoint];
    const query =
      direction === "min"
        ? `(min-width: ${width}px)`
        : `(max-width: ${width - 1}px)`;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [breakpoint, direction]);

  return matches;
};
