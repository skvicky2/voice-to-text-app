import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation<any>();

  const handleToggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    console.log("User logged out");
    navigation.navigate("Welcome");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : colors.bgEnd },
      ]}
    >
      {/* Header */}
      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
        Settings
      </Text>

      {/* User Info Card */}
      <View style={styles.card}>
        <View style={styles.userRow}>
          <MaterialIcons name="person" size={26} color={colors.primary} />
          <View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>johndoe@email.com</Text>
          </View>
        </View>
      </View>

      {/* Preferences Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Theme</Text>
          <Switch value={isDarkMode} onValueChange={handleToggleTheme} />
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <MaterialIcons name="logout" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
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
    color: "#000",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
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
    color: "#000",
  },
  logoutBtn: {
    // backgroundColor: '#7C4DFF',
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 40,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
