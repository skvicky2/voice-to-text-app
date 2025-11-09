// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Switch,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { colors } from "../../theme";

// export default function SettingsScreen() {
//   // Example account data
//   const [accountName, setAccountName] = useState("John Doe");
//   const [accountEmail, setAccountEmail] = useState("john.doe@example.com");

//   // Theme toggle
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     // Load initial theme if you have persistence
//   }, []);

//   const toggleTheme = () => {
//     setIsDark((prev) => !prev);
//     // Integrate with your ThemeContext or theming solution here
//   };

//   const handleSignOut = () => {
//     Alert.alert(
//       "Sign Out",
//       "Are you sure you want to sign out?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Sign Out",
//           style: "destructive",
//           onPress: () => {
//             // Implement sign-out logic, e.g., clear tokens and navigate to Auth
//             // navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
//             console.log("User signed out");
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   // Subcomponent for a row
//   const SettingRow = ({
//     iconName,
//     title,
//     onPress,
//     rightContent,
//   }: {
//     iconName: any;
//     title: any;
//     onPress: any;
//     rightContent: any;
//   }) => (
//     <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
//       <View style={styles.rowIcon}>
//         <MaterialIcons
//           name={iconName}
//           size={22}
//           color={isDark ? "#fff" : "#333"}
//         />
//       </View>
//       <View style={styles.rowContent}>
//         <Text style={[styles.rowTitle, isDark && styles.darkText]}>
//           {title}
//         </Text>
//       </View>
//       {rightContent}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={[styles.container, isDark && styles.containerDark]}>
//       {/* Account Section */}
//       <View style={styles.section}>
//         <Text style={[styles.sectionHeader, isDark && styles.darkText]}>
//           Account
//         </Text>

//         <SettingRow
//           iconName="person"
//           title="User Name"
//           onPress={() => {
//             console.log("Open Profile");
//             // navigation.navigate('Profile');
//           }}
//           rightContent={
//             <Text style={styles.rowValue}>{accountName}</Text>
//             // <MaterialIcons
//             //   name="chevron-right"
//             //   size={20}
//             //   color={isDark ? "#fff" : "#555"}
//             //   style={styles.chevron}
//             // />
//           }
//         />

//         <SettingRow
//           iconName="email"
//           title="Email"
//           onPress={() => {
//             console.log("Edit Email");
//           }}
//           rightContent={<Text style={styles.rowValue}>{accountEmail}</Text>}
//         />
//         <TouchableOpacity
//           style={[styles.row, styles.signOutRow]}
//           onPress={handleSignOut}
//           activeOpacity={0.7}
//         >
//           <View style={styles.rowIcon}>
//             <MaterialIcons name="logout" size={22} color="#e74c3c" />
//           </View>
//           <View style={styles.rowContent}>
//             <Text style={[styles.rowTitle, { color: "#e74c3c" }]}>
//               Sign Out
//             </Text>
//           </View>
//           <MaterialIcons
//             name="chevron-right"
//             size={20}
//             color="#e74c3c"
//             style={styles.chevron}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Theme Section */}
//       <View style={styles.section}>
//         <Text style={[styles.sectionHeader, isDark && styles.darkText]}>
//           Theme
//         </Text>

//         <View style={styles.row}>
//           <View style={styles.rowIcon}>
//             <MaterialIcons
//               name="wb-sunny"
//               size={22}
//               color={isDark ? "#fff" : "#333"}
//             />
//           </View>
//           <View style={styles.rowContent}>
//             <Text style={[styles.rowTitle, isDark && styles.darkText]}>
//               Dark Mode
//             </Text>
//           </View>
//           <Switch
//             value={isDark}
//             onValueChange={toggleTheme}
//             trackColor={{ false: "#767577", true: "#4f8bd6" }}
//             thumbColor={isDark ? "#fff" : "#f4f3f4"}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     backgroundColor: colors.bgEnd,
//   },
//   containerDark: {
//     backgroundColor: "#1e1c21ff",
//   },
//   section: {
//     marginVertical: 8,
//     paddingVertical: 8,
//     borderRadius: 12,
//     backgroundColor: "#ffffffff",
//     overflow: "hidden",
//   },
//   sectionHeader: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#555",
//     paddingVertical: 16,
//     paddingHorizontal: 8,
//   },
//   darkText: {
//     color: "#ffffffff",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderTopWidth: 1,
//     borderTopColor: "#e1e1e1ff",
//   },
//   rowIcon: {
//     width: 32,
//     alignItems: "center",
//   },
//   rowContent: {
//     flex: 1,
//     marginLeft: 8,
//   },
//   rowTitle: {
//     fontSize: 16,
//     color: "#333",
//   },
//   rowValue: {
//     fontSize: 14,
//     color: "#666",
//   },
//   chevron: {
//     marginLeft: 6,
//   },
//   signOutRow: {
//     // optional styling
//   },
//   // Dark mode tweaks
// });

// File: src/screens/SettingsScreen.js
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
