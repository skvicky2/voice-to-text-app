import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined; // No params for Welcome screen
  SignUp: undefined; // No params for SignUp screen
  Login: undefined; // No params for Home screen
  Home: { itemId: number; otherParam?: string }; // Params for Details screen
};
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LoginScreen";
import TranscribeScreen from "./src/screens/apps/TranscribeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeScreen } from "./src/utils/SafeScreen";
import { CustomStatusBar } from "./src/utils/CustomStatusBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryScreen from "./src/screens/apps/HistoryScreen";
import SettingsScreen from "./src/screens/apps/SettingsScreen";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { ThemeProvider, useThemeColors } from "./src/utils/ThemeContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

function MyTabs() {
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          marginTop: 5,
        },
        tabBarStyle: {
          height: "10%",
          backgroundColor: colors.bgEnd,
          shadowColor: colors.primary,
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
          elevation: 8,
          paddingTop: 5,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "History") iconName = "history";
          else iconName = "settings";

          return (
            <View style={[styles.iconContainer]}>
              {route.name === "Home" && (
                <Entypo name="chat" size={24} color={color} />
              )}
              {(route.name === "History" || route.name === "Settings") && (
                <MaterialIcons name={iconName} size={24} color={color} />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={TranscribeScreen} />
      {/* <Tab.Screen name="History" component={HistoryScreen} /> */}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <CustomStatusBar
            barStyle="light-content"
            backgroundColor="#000000ff"
          />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={MyTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "transparent",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
});
