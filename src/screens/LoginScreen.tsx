import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { colors } from "../theme";
import WelcomeScreenSvg from "../../assets/svg/WelcomeScreenSvg";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const onLogin = () => {
    // Replace with real auth
    console.log("Log in:", { email, password, remember });
    navigation.navigate("Home");
  };

  const onSocial = (provider: string) => {
    console.log("Social:", provider);
  };

  return (
    <LinearGradient
      colors={[colors.accent1, colors.primary1, colors.accent1]}
      style={styles.root}
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.28)", "rgba(255,255,255,0.02)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.screenMirror}
      />
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back-ios" size={22} color="#444444ff" />
                </TouchableOpacity>
              </View>
              <WelcomeScreenSvg width={250} height={250} />
            </View>
            <BlurView intensity={50} tint="light">
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Welcome Back</Text>

                <View style={styles.inputRow}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    placeholderTextColor="#bbb"
                  />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#bbb"
                  />
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={onLogin}>
                  <Text style={styles.primaryBtnText}>Log In</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 20,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  screenBlur: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  screenMirror: {
    position: "absolute",
    top: -40,
    left: -40,
    width: width + 80,
    height: 180,
    transform: [{ rotate: "-10deg" }],
    opacity: 0.9,
    pointerEvents: "none",
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    fontStyle: "italic",
    textAlign: "center",
  },
  inputRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#0a84ff",
  },
  checkboxDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0a84ff",
  },
  rememberText: {
    fontSize: 14,
    color: "#333",
  },
  forgotText: {
    fontSize: 14,
    color: "#0a84ff",
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    padding: 14,
    marginTop: 30,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#555",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialBtn: {
    marginHorizontal: 15,
  },
});
