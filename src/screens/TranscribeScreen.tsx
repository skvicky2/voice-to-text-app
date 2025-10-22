import React, { use } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { colors } from "../theme";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function TranscribeScreen() {
  const [showSignOutText, setShowSignOutText] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [recording, setRecording] = React.useState<Audio.Recording | null>(
    null
  );
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [recordTime, setRecordTime] = React.useState<number>(0);
  const [recordUri, setRecordUri] = React.useState<string | null>(null);
  const [transcribedText, setTranscribedText] = React.useState<string | null>(
    null
  );
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const navigation = useNavigation<any>();

  const onRecordPress = async () => {
    try {
      if (isRecording && recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordUri(uri || null);
        setSelectedFile(uri || "Recorded audio");
        setIsRecording(false);
        setRecording(null);
        return;
      }

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Microphone permission is required to record audio."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(
        (Audio as any).RecordingOptionsPresets?.HIGH_QUALITY ?? {}
      );
      await rec.startAsync();
      setRecording(rec);
      setIsRecording(true);
      setRecordTime(0);

      const start = Date.now();
      const timer = setInterval(
        () => setRecordTime(Math.floor((Date.now() - start) / 1000)),
        500
      );
      rec.setOnRecordingStatusUpdate((status: any) => {
        if (!status.isRecording) clearInterval(timer);
      });
    } catch (err) {
      console.warn("record error", err);
      Alert.alert("Recording error", String(err));
    }
  };

  const onUploadPress = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      if (res.type === "success") {
        setSelectedFile(res.name || res.uri);
        setRecordUri(res.uri || null);
      }
    } catch (err) {
      console.warn("picker error", err);
    }
  };

  const onSubmit = () => {
    if (!selectedFile && !recordUri) {
      Alert.alert(
        "No audio",
        "Please record or select a file before submitting."
      );
      return;
    }

    const name = selectedFile ?? recordUri ?? "audio";
    const simulated = `Transcribed text for ${name}: \nThis is a placeholder transcript generated locally.`;
    setTranscribedText(simulated);
    Alert.alert("Submitted", "Audio ready for transcription (placeholder)");
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
    <View
      //   colors={[colors.bgEnd, colors.muted2, colors.bgEnd]}
      style={styles.container}
    >
      <View style={{ width: width - 40, marginVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>AudioIntel</Text>
          <Pressable
            onPress={() => navigation.navigate("Welcome")}
            onHoverIn={() => setShowSignOutText(true)}
            onHoverOut={() => setShowSignOutText(false)}
            onFocus={() => setShowSignOutText(true)}
            onBlur={() => setShowSignOutText(false)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="log-out-outline" size={32} color="#250058ff" />
            {showSignOutText && <Text>Sign out</Text>}
          </Pressable>
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
          <View style={{ flex: 1 }}>
            {/* <Text style={{ fontSize: 14, color: colors.muted }}>Source</Text> */}
            <Text
              style={styles.fileNameText}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {selectedFile ?? recordUri}
            </Text>
          </View>
          <View style={styles.sourceActions}>
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                marginRight: 12,
                backgroundColor: colors.green,
                borderRadius: 50,
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="checkmark-sharp"
                size={24}
                color={colors.bgStart}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelFile}
              style={{
                marginRight: 12,
                backgroundColor: colors.red,
                borderRadius: 50,
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="close" size={24} color={colors.bgStart} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={[styles.footerContainer]}>
        <TouchableOpacity
          style={[
            styles.footerBtn,
            // { backgroundColor: isRecording ? "#ff3333" : colors.secondary },
          ]}
          onPress={onRecordPress}
          accessibilityLabel={
            isRecording ? "Stop recording" : "Start recording"
          }
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={36}
            // color="#fff"
            color={isRecording ? "#ff3333" : colors.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerBtn}
          onPress={onUploadPress}
          accessibilityLabel="Upload file"
        >
          {/* <MaterialIcons
            name="file-upload"
            size={44}
            //   color={colors.green}
            color={colors.muted1}
          /> */}
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
    marginTop: 55,
    // paddingHorizontal: 40,
    // paddingVertical: 40,
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
    // maxHeight: 560,
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
    bottom: 40,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    // marginBottom: 12,
    // marginTop: 12,
    marginLeft: 12,
    width: width - 40,
  },
  fileNameText: { fontSize: 16, fontWeight: "600", color: colors.muted1 },
  sourceActions: {
    // marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
