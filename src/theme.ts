import AsyncStorage from "@react-native-async-storage/async-storage";

export const colors = {
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
};

const lightColors = {
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
  border: "#2a2330",
};

export const darkColors = {
  bgStart: "#1a141d",
  bgMid: "#221a27",
  bgEnd: "#2a2330",
  cardBg: "rgba(20,20,20,0.92)",

  primary: "#b68bff",
  primary1: "#9f6dff",
  primary2: "#7f4fff",
  primary3: "#3f2a53",

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
  border: "#937aa9ff",
};

export async function getColors() {
  try {
    const theme = await AsyncStorage.getItem("darktheme");

    if (theme === "yes") {
      return darkColors;
    }

    return lightColors;
  } catch (error) {
    console.error("Failed to load theme colors:", error);
    return lightColors; // fallback
  }
}
