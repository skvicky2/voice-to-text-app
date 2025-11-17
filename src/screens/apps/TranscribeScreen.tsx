import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { colors } from "../../theme";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as FileSystem from "expo-file-system/legacy";
import CryptoJS from "crypto-js";
import { File } from "expo-file-system";
import { decode as atob, encode as btoa } from "base-64";
import * as Crypto from "expo-crypto";
import { TRANSCRIBE_API_URL } from "../../axios/apiUrl";

const { width } = Dimensions.get("window");

const AES_KEY_BYTES = new Uint8Array([
  0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89,
  0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23,
  0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
]);

const AES_KEY =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
export default function TranscribeScreen() {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [recording, setRecording] = React.useState<Audio.Recording | null>(
    null
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordTime, setRecordTime] = React.useState<number>(0);
  const [recordUri, setRecordUri] = React.useState<string | null>(null);
  const [transcribedText, setTranscribedText] = React.useState<string | null>(
    null
  );
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [fileBlob, setFileBlob] = React.useState<any | null>(null);
  const [mode, setMode] = useState<"speech" | "file">("speech");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [hasResponse, setHasResponse] = useState(false);
  const navigation = useNavigation<any>();

  const onUploadPress = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      console.log("DocumentPicker result:", res);
      setSelectedFile(res.assets[0].name || res.assets[0].uri);
      setRecordUri(res.assets[0].uri || null);
      console.log("File selected:", res);
      // Convert selected file to blob
      const uri = res.assets[0].uri;
      // const blob = await getBlobFromUri(uri);
      setFileBlob(uri);
      // console.log("Blob created from file:", blob);
      setMode("file");
      // }
    } catch (err) {
      console.warn("picker error", err);
    }
  };

  const onSubmit = async () => {
    if (!selectedFile && !recordUri) {
      Alert.alert(
        "No audio",
        "Please record or select a file before submitting."
      );
      return;
    }

    try {
      const blobToUpload = fileBlob;
      console.log("blobToUpload", blobToUpload);
      if (!blobToUpload) {
        setStatus("No audio selected.");
        return;
      }

      setStatus("Encrypting...");
      setHasResponse(false);
      setTranscribedText(null);
      const { iv, ciphertext } = await encryptAudioFile(fileBlob, AES_KEY);

      const blob = new Blob([ciphertext], { type: "application/octet-stream" });
      const formData = new FormData();

      formData.append("encrypted_file", blob, "recorded_audio.webm");
      formData.append("source_type", "file_upload");
      formData.append("original_filename", "recorded_audio.webm");
      formData.append("iv", iv);
      formData.append("mode", "file");
      formData.append("device_name", "ios-mobile");
      console.log("formData", formData);
      const response = await fetch(
        process.env.API_BASE_URL + TRANSCRIBE_API_URL,
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Transcription received:", response);

      // const response = await axios.post(
      //   API_BASE_URL + TRANSCRIBE_API_URL,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     transformRequest: (data) => data, // <— VERY IMPORTANT
      //   }
      // );
      // console.log("Transcription received:", response.data);

      // return response.data;
    } catch (err) {
      // setTranscribedText(text?.trim() || "No transcription available.");
      // setStatus(text ? "✅ Upload successful" : "Upload processed — no transcription found.");
      console.error(err);
      // setHasResponse(true);
      setTranscribedText("No transcription available.");
      // setStatus("❌ Upload failed or server error");
    } finally {
      // setProgress(0);
    }

    const name = selectedFile ?? recordUri ?? "audio";
    const simulated = `Transcribed text for ${name}: \nThis is a placeholder transcript generated locally.`;
    setTranscribedText(simulated);
    Alert.alert("Submitted", "Audio ready for transcription (placeholder)");
  };

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
      }
    })();

    return () => {
      // Cleanup sound on unmount
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Helper: Convert file URI → Blob
  const getBlobFromUri = async (uri: any): Promise<Blob> => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64", // ✅ works safely in all Expo versions
    });

    const blob = new Blob(
      [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
      { type: "audio/m4a" }
    );

    return blob;
  };
  const onRecordPress = async () => {
    try {
      if (!isRecording) {
        // Start Recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        console.log("");
        setRecording(recording);
        setIsRecording(true);
        console.log("Recording started...");
      } else {
        if (recording === null) return;
        // Stop Recording
        setIsRecording(false);
        console.log("Stopping recording...");
        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();
        console.log("Recording saved at:", uri);
        setRecordUri(uri);
        setRecording(null);
        // Convert recorded file to blob
        const blob = await getBlobFromUri(uri);
        setAudioBlob(blob);
        console.log("Blob created:", blob);

        // Play the recorded audio
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();
        console.log("Playback started...");
      }
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  async function encryptAudioFile(uri: string, AES_KEY: string) {
    // 1️⃣ Read file contents as Base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 2️⃣ Generate secure IV (16 random bytes)
    const ivArray = Crypto.getRandomValues(new Uint8Array(16)); // ✅ Works in Expo Go
    const iv = CryptoJS.lib.WordArray.create(ivArray);

    // 3️⃣ Encrypt file using AES-CBC
    const encrypted = CryptoJS.AES.encrypt(
      base64,
      CryptoJS.enc.Utf8.parse(AES_KEY),
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // 4️⃣ Return IV + ciphertext (both needed for decryption)
    return {
      iv: CryptoJS.enc.Hex.stringify(iv),
      ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    };
  }

  const playAudio = async () => {
    try {
      const uri = recordUri;
      if (!uri) return;

      if (sound && isPlaying) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setIsPlaying(false);
        setSound(null);
        return;
      }

      const { sound: s } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(s);
      setIsPlaying(true);
      s.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          s.unloadAsync();
          setSound(null);
        }
      });
    } catch (err) {
      console.warn("play error", err);
      Alert.alert("Playback error", String(err));
    }
  };

  const cancelFile = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
    } catch (e) {}
    setSelectedFile(null);
    setRecordUri(null);
    setTranscribedText(null);
    setIsRecording(false);
    setRecording(null);
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: width - 40, marginVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>AudioIntel</Text>
        </View>

        <ScrollView
          style={styles.transcriptBox}
          contentContainerStyle={{ padding: 12 }}
        >
          {selectedFile || recordUri ? (
            <>
              {transcribedText ? (
                <Text style={styles.transcriptText}>{transcribedText}</Text>
              ) : (
                <Text style={[styles.transcriptText, { color: colors.muted }]}>
                  No transcript yet. Tap the check to confirm or Submit to
                  simulate.
                </Text>
              )}
            </>
          ) : (
            <Text style={[styles.transcriptText, { color: colors.muted }]}>
              No file selected or recorded yet.
            </Text>
          )}
        </ScrollView>
      </View>

      {(selectedFile || recordUri) && (
        <View style={styles.sourceRow}>
          <TouchableOpacity style={[styles.playBtn]} onPress={playAudio}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color={colors.muted}
              style={{ marginLeft: !isPlaying ? 2 : 0 }}
            />
          </TouchableOpacity>
          {/* Play / Pause button */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {/* <Text style={{ fontSize: 14, color: colors.muted }}>Source</Text> */}
            <Text
              style={styles.fileNameText}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {selectedFile ?? recordUri?.split("/").pop()}
            </Text>
          </View>
          <View style={styles.sourceActions}>
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                marginRight: 12,
                backgroundColor: colors.green,
                borderRadius: 50,
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="checkmark-sharp"
                size={22}
                color={colors.bgStart}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelFile}
              style={{
                marginRight: 12,
                backgroundColor: colors.red,
                borderRadius: 50,
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="close" size={22} color={colors.bgStart} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={[styles.footerContainer]}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={onRecordPress}
          accessibilityLabel={
            isRecording ? "Stop recording" : "Start recording"
          }
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={36}
            color={isRecording ? "#ff3333" : colors.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerBtn}
          onPress={onUploadPress}
          accessibilityLabel="Upload file"
        >
          <Octicons name="upload" size={32} color="#000000ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.bgEnd,
  },
  card: {
    width: width - 40,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: { fontSize: 32, fontWeight: "700", color: colors.primary },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 16,
    textAlign: "left",
  },
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  option: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.11)",
    height: 150,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  optionText: { fontSize: 16, fontWeight: "600" },
  muted: { fontSize: 12, color: colors.muted, marginTop: 6, flexShrink: 1 },
  primaryButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  transcriptBox: {
    marginTop: 28,
    width: "100%",
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 6px 6px rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 20,
  },
  transcriptTitle: { fontSize: 18, fontWeight: "700", marginBottom: 18 },
  transcriptText: { fontSize: 16, fontWeight: "600", color: colors.text },
  footerBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 40,
    borderColor: colors.muted2,
    borderWidth: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
    alignItems: "center",
    paddingVertical: 18,
    position: "absolute",
    bottom: 25,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginLeft: 12,
    width: width - 40,
  },
  fileNameText: { fontSize: 15, fontWeight: "400", color: colors.muted1 },
  sourceActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  playBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderColor: colors.muted2,
    borderWidth: 1,
  },
});
