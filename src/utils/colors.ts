export type ThemeType = "light" | "dark";

export interface ColorPalette {
  bgStart: string;
  bgEnd: string;
  bgMid: string;
  primary: string;
  primary1: string;
  primary2: string;
  primary3: string;
  secondary: string;
  accent: string;
  accent1: string;
  text: string;
  cardBg: string;
  border: string;
  muted: string;
  muted1: string;
  muted2: string;
  green: string;
  green1: string;
  red: string;
}

export const lightColors: ColorPalette = {
  bgStart: "#fff5fb",
  bgMid: "#fff0f9",
  bgEnd: "#f6f6ff",
  cardBg: "rgba(255,255,255,0.96)",
  primary: "#a63affff", // purple
  primary1: "#c8acffff", // light purple
  primary2: "#d9c6ffff", // light purple
  primary3: "#f7f3ff", // very light purple
  secondary: "#ad49ffff",
  accent: "#FF85D0", // pink
  accent1: "#feb3e1ff", // pink
  text: "#1f1f1f",
  muted: "#4f4f4fff",
  muted2: "#cececeff",
  muted1: "#333333ff",
  green: "#3ea049ff",
  green1: "#0dc322ff",
  red: "#df4747ff",
  border: "#888888ff",
};

export const darkColors: ColorPalette = {
  bgStart: "#1a141d",
  bgMid: "#221a27",
  bgEnd: "#211922ff",
  cardBg: "rgba(20,20,20,0.92)",

  primary1: "#b68bff",
  primary: "#9f6dff",
  primary2: "#7f4fff",
  primary3: "#3e3447ff",

  secondary: "#c96dff",
  accent: "#ff77c8",
  accent1: "#d36fa8",

  text: "#f1ecf8",
  muted: "#b6a8c7",
  muted1: "#8b7b99",
  muted2: "#4b4154",

  green: "#4bd37c",
  green1: "#17a74a",
  red: "#ff6b6b",
  border: "#d6d6d6ff",
};

export const getColorsByTheme = (theme: ThemeType): ColorPalette =>
  theme === "dark" ? darkColors : lightColors;
