import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { ThemeType, getColorsByTheme, ColorPalette } from "./colors";

interface ThemeContextValue {
  theme: ThemeType;
  colors: ColorPalette;
  toggleTheme: () => void;
  setThemeMode: (t: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  // Load saved theme or system default
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("darktheme");

      if (saved === "yes") setTheme("dark");
      else if (saved === "no") setTheme("light");
      else {
        const system =
          Appearance.getColorScheme() === "dark" ? "dark" : "light";
        setTheme(system);
      }
    };

    load();
  }, []);

  // Toggle and save theme
  const toggleTheme = async () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    await AsyncStorage.setItem("darktheme", next === "dark" ? "yes" : "no");
  };

  const setThemeMode = async (t: ThemeType) => {
    setTheme(t);
    await AsyncStorage.setItem("darktheme", t === "dark" ? "yes" : "no");
  };

  const colors = getColorsByTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access theme
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};

// Simple hook for colors only
export const useThemeColors = () => {
  return useTheme().colors;
};
