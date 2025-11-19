import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { useThemeColors } from "../../utils/ThemeContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AudioItem = {
  id: string;
  date: string;
  audioName: string;
  transcribe: string;
  uri: string;
};

const data: AudioItem[] = [
  {
    id: "1",
    date: "Oct 12, 2023",
    audioName: "Hello",
    transcribe: "Bonjour",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    date: "Oct 12, 2023",
    audioName: "Thank you",
    transcribe: "Merci",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    date: "Sep 30, 2023",
    audioName: "Goodbye",
    transcribe: "Au revoir",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "21",
    date: "Oct 12, 2023",
    audioName: "Hello",
    transcribe: "Bonjour",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "22",
    date: "Oct 12, 2023",
    audioName: "Thank you",
    transcribe: "Merci",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "23",
    date: "Sep 30, 2023",
    audioName: "Goodbye",
    transcribe: "Au revoir",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "31",
    date: "Oct 12, 2023",
    audioName: "Hello",
    transcribe: "Bonjour",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "32",
    date: "Oct 12, 2023",
    audioName: "Thank you",
    transcribe: "Merci",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "33",
    date: "Sep 30, 2023",
    audioName: "Goodbye",
    transcribe: "Au revoir",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "41",
    date: "Oct 12, 2023",
    audioName: "Hello",
    transcribe: "Bonjour",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "42",
    date: "Oct 12, 2023",
    audioName: "Thank you",
    transcribe: "Merci",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "43",
    date: "Sep 30, 2023",
    audioName: "Goodbye",
    transcribe: "Au revoir",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const AudioAccordionScreen = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const colors = useThemeColors();
  const styles = createStyles(colors);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === id ? null : id);
  };

  const handlePlayPause = async (item: AudioItem) => {
    try {
      // Stop existing audio
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // If same item is clicked again → pause
      if (playingId === item.id) {
        setPlayingId(null);
        return;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: item.uri });
      soundRef.current = sound;
      setPlayingId(item.id);

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if ((status as AVPlaybackStatusSuccess).didJustFinish) {
          setPlayingId(null);
        }
      });
    } catch (error) {
      console.warn("Audio playback error:", error);
    }
  };

  const renderItem = ({ item }: { item: AudioItem }) => {
    const isExpanded = expanded === item.id;
    const isPlaying = playingId === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.9}
          style={styles.cardHeader}
        >
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => handlePlayPause(item)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={28}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.audioName}>{item.audioName}</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.date}>{item.date}</Text>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={22}
              color="#555"
              style={{ marginLeft: 6 }}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.cardBody}>
            <Text style={styles.label}>Transcribed Text:</Text>
            <Text style={styles.transcribe}>{item.transcribe}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio History</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default AudioAccordionScreen;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgEnd,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 12,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: 14,
      marginVertical: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      shadowColor: colors.text,
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    audioName: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "500",
      color: colors.muted,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    date: {
      fontSize: 14,
      color: colors.border,
    },
    cardBody: {
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.muted2,
      paddingTop: 8,
    },
    label: {
      fontSize: 14,
      color: colors.border,
      marginBottom: 4,
    },
    transcribe: {
      fontSize: 15,
      color: colors.text,
      fontWeight: "500",
    },
  });
