import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LOGOUT_API_URL } from "../../axios/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, useThemeColors } from "../../utils/ThemeContext";
import Loader from "../../utils/Loader";
import axiosInstance from "../../axios/interceptors";
import { LOGOUT_TEXT } from "../../utils/constants";

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleToggleTheme = () => toggleTheme();

  useEffect(() => {
    const getUserData = async () => {
      const emailId: any = await AsyncStorage.getItem("emailId");
      const fullName: any = await AsyncStorage.getItem("fullName");
      setEmail(emailId);
      setName(fullName);
    };
    getUserData();
  });

  const handleLogout = async () => {
    setLoading(true);
    await axiosInstance
      .post(
        process.env.EXPO_PUBLIC_MOBILE_APP_API_BASE_URL + LOGOUT_API_URL,
        null
      )
      .then(async () => {
        setLoading(false);
        await AsyncStorage.removeItem("accessToken");
        navigation.navigate("Welcome");
      })
      .catch((err: any) => {
        setLoading(false);
        console.log("Error while logging out:", err);
      });
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.bgEnd }]}>
        {/* Header */}
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        {/* User Info Card */}
        <View style={styles.card}>
          <View style={styles.userRow}>
            <MaterialIcons name="person" size={26} color={colors.primary} />
            <View>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        </View>

        {/* Preferences Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Theme</Text>
            <Switch
              value={theme === "dark"}
              onValueChange={handleToggleTheme}
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={22} color={colors.cardBg} />
          <Text style={styles.logoutText}>{LOGOUT_TEXT}</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={loading} text="Logging out..." />
    </>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 24,
    },
    card: {
      backgroundColor: colors.primary3,
      borderRadius: 16,
      padding: 18,
      marginBottom: 16,
      shadowColor: colors.text,
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    userName: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    userEmail: {
      fontSize: 14,
      color: colors.muted,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    logoutBtn: {
      backgroundColor: colors.primary,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 14,
      borderRadius: 12,
      marginTop: 40,
      gap: 12,
    },
    logoutText: {
      color: colors.cardBg,
      fontSize: 16,
      fontWeight: "700",
    },
  });
