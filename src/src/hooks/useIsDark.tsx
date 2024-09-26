"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";

const useIsDark = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  useLayoutEffect(() => {
    if (!globalThis.window) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersDarkMode;
};

export default useIsDark;
