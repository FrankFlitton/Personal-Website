"use client";

import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Listen to system preference changes
  useLayoutEffect(() => {
    if (!globalThis.window) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Load saved theme preference on mount
  useLayoutEffect(() => {
    if (!globalThis.window) return;
    
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!globalThis.window) return;

    const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, systemPrefersDark]);

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    if (theme === "system") {
      setThemeAndSave(systemPrefersDark ? "light" : "dark");
    } else if (theme === "light") {
      setThemeAndSave("dark");
    } else {
      setThemeAndSave("light");
    }
  };

  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

  return {
    theme,
    isDark,
    setTheme: setThemeAndSave,
    toggleTheme,
    systemPrefersDark,
  };
};

export default useTheme;