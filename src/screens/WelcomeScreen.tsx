// LoginScreen.tsx
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme";
import WelcomeSVGComponent from "../../assets/svg/WelcomeScreenSvg";

const { width } = Dimensions.get("window");

function WelcomeScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation<any>();

  const onLogin = () => {
    if (!email.includes("@") || password.length < 4) {
      Alert.alert(
        "Validation",
        "Please enter a valid email and password (min 4 chars)."
      );
      return;
    }
    // Simple fake auth; in real app call API
    navigation.replace("Home");
  };

  return (
    <View
      // colors={[colors.bgEnd, colors.bgEnd]}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 2 }} // Horizontal gradient
      style={[styles.container, styles.gradient]}
    >
      <View style={styles.topGap} />
      <WelcomeSVGComponent width={400} height={400} />
      <Text style={styles.title}>Welcome to AudioIntel</Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("SignUp")}
        accessibilityRole="button"
      >
        <Text style={styles.primaryButtonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.glassButton}
        onPress={() => navigation.navigate("Login")}
        accessibilityRole="button"
        activeOpacity={0.8}
      >
        <Text style={styles.ghostButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.bgEnd,
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 24,
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  topGap: {},
  illustrationCard: {
    width: width - 60,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  illusBox: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.bgEnd,
    alignItems: "center",
    justifyContent: "center",
  },
  illusEmoji: {
    fontSize: 72,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 12,
    fontStyle: "italic",
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    width: "90%",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  ghostButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
    width: "90%",
  },
  ghostButtonText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  glassButton: {
    width: "90%",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    // backgroundColor: "rgba(230, 230, 230, 0.66)",
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: "hidden",
    marginTop: 8,
  },
  buttonHighlight: {
    ...StyleSheet.absoluteFillObject,
    height: 48,
    top: 0,
    left: 0,
    opacity: 0.9,
    pointerEvents: "none",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  smallText: {
    fontSize: 14,
    color: colors.muted,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
