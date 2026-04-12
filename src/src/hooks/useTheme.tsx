"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Listen to system preference changes
  useEffect(() => {
    if (!globalThis.window) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Load saved theme preference on mount, and re-sync when another
  // useTheme instance broadcasts a change via custom window event.
  useEffect(() => {
    if (!globalThis.window) return;

    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    }

    const handleThemeChange = (e: Event) => {
      setTheme((e as CustomEvent<Theme>).detail);
    };

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!globalThis.window) return;

    const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme, systemPrefersDark]);

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: newTheme }));
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