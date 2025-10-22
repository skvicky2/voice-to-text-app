import { StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = {
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  appContainer: {
    backgroundColor: "#000",
  },
};
interface SafeViewProps {
  children: React.ReactNode;
  style?: object;
}

export const SafeScreen: React.FC<SafeViewProps> = ({ children, style }) => {
  if (Platform.OS === "ios") {
    return (
      <SafeAreaView style={[styles.appContainer, style]}>
        {children}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.container, styles.appContainer, style]}>
      {children}
    </SafeAreaView>
  );
};
