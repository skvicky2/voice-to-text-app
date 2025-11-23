import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { TRANSCRIBE_API_URL } from "../../axios/apiUrl";
import { useThemeColors } from "../../utils/ThemeContext";
import Loader from "../../utils/Loader";
import Snackbar from "../../utils/Snackbar";
import axiosInstance from "../../axios/interceptors";
import {
  APP_NAME,
  AUDIO_SELECTED_TEXT,
  NO_FILE_SELECTED,
  NO_TRANSCIBED_TEXT,
  NO_TRANSCIBED_TEXT_YET,
  SELECT_ANY_FILE_TEXT,
  UPLOAD_SUCCESS_NO_TRANSCRIPTION_TEXT,
  UPLOAD_SUCCESS_TEXT,
} from "../../utils/constants";
import { Platform } from "react-native";

const deviceType = Platform.OS;

const { width } = Dimensions.get("window");

export default function TranscribeScreen() {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [recording, setRecording] = React.useState<Audio.Recording | null>(
    null
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordUri, setRecordUri] = React.useState<string | null>(null);
  const [transcribedText, setTranscribedText] = React.useState<string | null>(
    null
  );
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [fileBlob, setFileBlob] = React.useState<any | null>(null);
  const [mode, setMode] = useState<"speech" | "file">("speech");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const onUploadPress = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      setSelectedFile(res.assets[0].name || res.assets[0].uri);
      setRecordUri(res.assets[0].uri || null);
      const uri = res.assets[0].uri;
      const name = res.assets[0].name;
      const mime = res.assets[0].mimeType || "audio/m4a";
      const formatJSON: any = {
        uri,
        name,
        type: mime,
      };
      setFileBlob(formatJSON);

      setMode("file");
    } catch (err) {
      console.warn("picker error", err);
    }
  };

  const onSubmit = async () => {
    if (!selectedFile && !recordUri) {
      setShowSnackbar(true);
      setStatus(SELECT_ANY_FILE_TEXT);
      return;
    }
    setLoading(true);
    try {
      const blobToUpload = mode === "speech" ? audioBlob : fileBlob;
      if (!blobToUpload) {
        setStatus(AUDIO_SELECTED_TEXT);
        return;
      }

      setTranscribedText(null);
      const formData = new FormData();

      formData.append("audio_file", blobToUpload);
      formData.append("source_type", "mobile_ios");
      formData.append("original_filename", blobToUpload.name);
      formData.append("mode", mode);
      formData.append("device_name", deviceType);

      axiosInstance
        .post(
          process.env.EXPO_PUBLIC_MOBILE_APP_API_BASE_URL + TRANSCRIBE_API_URL,
          formData
        )
        .then(async (response: any) => {
          const json = await response.data;
          setTranscribedText(json.transcription || NO_TRANSCIBED_TEXT);
          setLoading(false);
          setShowSnackbar(true);
          setStatus(
            json.status === "success"
              ? UPLOAD_SUCCESS_TEXT
              : UPLOAD_SUCCESS_NO_TRANSCRIPTION_TEXT
          );
        })
        .catch((err) => {
          console.error("Error while transcribing in api", err);
          setTranscribedText(NO_TRANSCIBED_TEXT);
          setShowSnackbar(true);
          setStatus("❌ Error while transcribing the uploaded file");
          setLoading(false);
        });
    } catch (err) {
      console.error("Error while transcribing", err);
      setTranscribedText(NO_TRANSCIBED_TEXT);
      setShowSnackbar(true);
      setStatus("❌ Error while transcribing.");
      setLoading(false);
    }
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
        setRecording(recording);
        setIsRecording(true);
      } else {
        if (recording === null) return;
        // Stop Recording
        setIsRecording(false);
        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();
        const name = uri!.split("/").pop();
        const formatJSON: any = {
          uri,
          name,
          type: recording._options?.web.mimeType,
        };
        setRecordUri(uri);
        setRecording(null);
        setMode("speech");
        setAudioBlob(formatJSON);

        // Play the recorded audio
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();
      }
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

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
      setStatus("❌ Playback error");
      setShowSnackbar(true);
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
    <>
      <View style={styles.container}>
        <View style={{ width: width - 40, marginVertical: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/favicon.png")}
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <Text style={styles.title}>{APP_NAME}</Text>
          </View>

          <ScrollView
            style={styles.transcriptBox}
            contentContainerStyle={{ padding: 10 }}
          >
            {selectedFile || recordUri ? (
              <>
                {transcribedText ? (
                  <Text style={styles.transcriptText}>{transcribedText}</Text>
                ) : (
                  <Text
                    style={[styles.transcriptText, { color: colors.muted }]}
                  >
                    {NO_TRANSCIBED_TEXT_YET}
                  </Text>
                )}
              </>
            ) : (
              <Text style={[styles.transcriptText, { color: colors.muted }]}>
                {NO_FILE_SELECTED}
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
                color={colors.text}
                style={{ marginLeft: !isPlaying ? 2 : 0 }}
              />
            </TouchableOpacity>
            {/* Play / Pause button */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
              color={isRecording ? colors.red : colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerBtn}
            onPress={onUploadPress}
            accessibilityLabel="Upload file"
          >
            <Octicons name="upload" size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar visible={showSnackbar} message={status} color={colors} />
      <Loader visible={loading} text="Uploading..." />
    </>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    option: {
      flex: 1,
      alignItems: "center",
      padding: 12,
      marginHorizontal: 8,
      borderRadius: 12,
      backgroundColor: colors.text,
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
    transcriptBox: {
      marginTop: 28,
      width: "100%",
      height: "70%",
      backgroundColor: colors.primary3,
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
      backgroundColor: colors.cardBg,
      borderColor: colors.muted2,
      borderWidth: 1,
    },
  });
