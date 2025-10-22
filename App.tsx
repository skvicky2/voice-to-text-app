import * as React from "react";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined; // No params for Welcome screen
  SignUp: undefined; // No params for SignUp screen
  Login: undefined; // No params for Home screen
  Home: { itemId: number; otherParam?: string }; // Params for Details screen
};
// Import your screen components
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LoginScreen";
import TranscribeScreen from "./src/screens/TranscribeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeScreen } from "./src/utils/SafeScreen";
// Removed duplicate StatusBar import

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={TranscribeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
