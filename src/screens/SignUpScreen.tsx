import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme";
import { BlurView } from "expo-blur";
import WelcomeScreenSvg from "../../assets/svg/WelcomeScreenSvg";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit() {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Missing info", "Please fill out name, email and password.");
      return;
    }
    if (password !== confirm) {
      Alert.alert(
        "Passwords do not match",
        "Please make sure passwords match."
      );
      return;
    }
    Alert.alert("Success", `Account created for ${name}`);
  }

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
              <ScrollView
                style={styles.card}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.cardTitle}>Create Your Account</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full name</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="Enter full name"
                      placeholderTextColor="#bfbfbf"
                      style={styles.input}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="you@example.com"
                      placeholderTextColor="#bfbfbf"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter password"
                      placeholderTextColor="#bfbfbf"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      accessibilityRole="button"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color="#a6a6a6"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      value={confirm}
                      onChangeText={setConfirm}
                      placeholder="Re-enter password"
                      placeholderTextColor="#bfbfbf"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={onSubmit}
                  accessibilityRole="button"
                >
                  <Text style={styles.submitButtonText}>Create Account</Text>
                </TouchableOpacity>
              </ScrollView>
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
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    color: "#333",
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
