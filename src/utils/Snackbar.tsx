import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "./ThemeContext";

interface SnackbarProps {
  message: string;
  visible: boolean;
  type?: "success" | "error";
  duration?: number;
  color: any;
}

export default function Snackbar({
  message,
  visible,
  duration = 2500,
  color,
}: SnackbarProps) {
  const slide = useRef(new Animated.Value(100)).current;
  const colors = useThemeColors();
  const styles = createStyles(colors);

  useEffect(() => {
    if (visible) {
      Animated.timing(slide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slide, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, duration);
      });
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: color?.muted,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 40,
      left: 20,
      right: 20,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 10,
      zIndex: 999,
      elevation: 3,
    },
    text: {
      color: colors.bgEnd,
      fontSize: 15,
    },
  });
