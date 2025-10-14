"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Theme, ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

  // Load saved theme preference on mount
  useEffect(() => {
    if (!globalThis.window) return;

    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!globalThis.window) return;

    const isDark =
      theme === "dark" || (theme === "system" && systemPrefersDark);

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

  const value: ThemeContextType = {
    theme,
    isDark,
    setTheme: setThemeAndSave,
    toggleTheme,
    systemPrefersDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
