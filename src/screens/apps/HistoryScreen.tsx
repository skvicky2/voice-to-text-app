// // // File: src/screens/HistoryScreen.js
// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   FlatList,
// //   StyleSheet,
// // } from "react-native";
// // import { colors } from "../../theme";
// // import { MaterialIcons } from "@expo/vector-icons";

// // const sampleData = [
// //   {
// //     id: "1",
// //     date: "2025-11-01",
// //     audio: "recording1.mp3",
// //     text: "Interview with John",
// //   },
// //   {
// //     id: "2",
// //     date: "2025-10-28",
// //     audio: "meeting.mp3",
// //     text: "Project meeting summary",
// //   },
// //   {
// //     id: "3",
// //     date: "2025-10-30",
// //     audio: "lecture.mp3",
// //     text: "Math class notes",
// //   },
// // ];

// // export default function HistoryScreen() {
// //   const [data, setData] = useState(sampleData);
// //   const [filteredData, setFilteredData] = useState(sampleData);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [sortConfig, setSortConfig] = useState({
// //     key: "date",
// //     direction: "asc",
// //   });

// //   useEffect(() => {
// //     handleSearch(searchQuery);
// //   }, [data]);

// //   const handleSearch = (text: any) => {
// //     setSearchQuery(text);
// //     if (!text.trim()) return setFilteredData(data);
// //     const lower = text.toLowerCase();
// //     const filtered = data.filter(
// //       (item) =>
// //         item.audio.toLowerCase().includes(lower) ||
// //         item.text.toLowerCase().includes(lower)
// //     );
// //     setFilteredData(filtered);
// //   };

// //   const handleSort = (key: any) => {
// //     let direction = "asc";
// //     if (sortConfig.key === key && sortConfig.direction === "asc")
// //       direction = "desc";
// //     setSortConfig({ key, direction });

// //     const sorted = [...filteredData].sort((a: any, b: any) => {
// //       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
// //       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
// //       return 0;
// //     });
// //     setFilteredData(sorted);
// //   };

// //   const renderHeader = () => (
// //     <View style={styles.headerRow}>
// //       {["date", "audio", "text"].map((col) => (
// //         <TouchableOpacity
// //           key={col}
// //           onPress={() => handleSort(col)}
// //           style={styles.headerCell}
// //         >
// //           <Text style={styles.headerText}>
// //             {col.toUpperCase()}{" "}
// //             {sortConfig.key === col
// //               ? sortConfig.direction === "asc"
// //                 ? "↑"
// //                 : "↓"
// //               : ""}
// //           </Text>
// //         </TouchableOpacity>
// //       ))}
// //     </View>
// //   );

// //   const renderItem = ({ item }: { item: any }) => (
// //     <View style={styles.row}>
// //       <Text style={styles.cell}>{item.date}</Text>
// //       <Text style={styles.cell}>{item.audio}</Text>
// //       <Text style={styles.cell}>{item.text}</Text>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>History</Text>
// //       {/* <View style={styles.searchSection}>
// //         <MaterialIcons
// //           style={styles.searchIcon}
// //           name="search"
// //           size={20}
// //           color="#000"
// //         /> */}
// //         {/* <TextInput
// //           style={styles.searchInput}
// //           placeholder="Search by audio or text..."
// //           value={searchQuery}
// //           onChangeText={handleSearch}

// //         /> */}
// //       {/* </View> */}

// // <View style={styles.searchContainer}>
// //   <MaterialIcons name="search" size={22} color="#888" style={styles.searchIcon} />
// //   <TextInput
// //     style={styles.searchInput}
// //     placeholder="Search by audio or text..."
// //     placeholderTextColor="#888"
// //     value={searchQuery}
// //     onChangeText={handleSearch}
// //   />
// // </View>

// //       {renderHeader()}

// //       <FlatList
// //         data={filteredData}
// //         renderItem={renderItem}
// //         keyExtractor={(item) => item.id}
// //         ListEmptyComponent={<Text style={styles.empty}>No records found</Text>}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 16, backgroundColor: colors.bgEnd },
// //   title: { fontSize: 26, fontWeight: "700", marginBottom: 12 },
// // //   searchInput: {
// // //     borderWidth: 1,
// // //     borderColor: "#ccc",
// // //     borderRadius: 8,
// // //     padding: 8,
// // //     marginBottom: 10,
// // //   },
// //   headerRow: {
// //     flexDirection: "row",
// //     backgroundColor: colors.primary3,
// //     borderTopWidth: 1,
// //     borderBottomWidth: 1,
// //     borderColor: "#ccc",
// //   },
// //   headerCell: { flex: 1, padding: 10 },
// //   headerText: { fontWeight: "600", color: "#333", textAlign: "left" },
// //   row: {
// //     flexDirection: "row",
// //     borderBottomWidth: 1,
// //     borderColor: "#eee",
// //     paddingVertical: 8,
// //   },
// //   cell: { flex: 1, textAlign: "left" },
// //   empty: { textAlign: "center", marginTop: 20, color: "#888" },
// //   searchContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 8,
// //     paddingHorizontal: 10,
// //     marginBottom: 10,
// //     backgroundColor: '#fff',
// //   },
// //   searchIcon: {
// //     marginRight: 6,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     paddingVertical: 8,
// //     fontSize: 16,
// //   },
// // });

// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { colors } from "../../theme";

// const accent = "#A63AFF";

// const data = [
//   {
//     id: "1",
//     date: "2025-11-01",
//     audioFile: "meeting1.mp3",
//     text: "Project discussion summary",
//   },
//   {
//     id: "2",
//     date: "2025-10-30",
//     audioFile: "notes.m4a",
//     text: "Daily notes from the standup",
//   },
//   {
//     id: "3",
//     date: "2025-10-28",
//     audioFile: "client_call.wav",
//     text: "Client feedback and next steps",
//   },
//   {
//     id: "4",
//     date: "2025-10-25",
//     audioFile: "lecture.mp3",
//     text: "Lecture on AI advancements",
//   },
//   {
//     id: "11",
//     date: "2025-11-01",
//     audioFile: "meeting1.mp3",
//     text: "Project discussion summary",
//   },
//   {
//     id: "12",
//     date: "2025-10-30",
//     audioFile: "notes.m4a",
//     text: "Daily notes from the standup",
//   },
//   {
//     id: "13",
//     date: "2025-10-28",
//     audioFile: "client_call.wav",
//     text: "Client feedback and next steps",
//   },
//   {
//     id: "14",
//     date: "2025-10-25",
//     audioFile: "lecture.mp3",
//     text: "Lecture on AI advancements",
//   },
//   {
//     id: "21",
//     date: "2025-11-01",
//     audioFile: "meeting1.mp3",
//     text: "Project discussion summary",
//   },
//   {
//     id: "22",
//     date: "2025-10-30",
//     audioFile: "notes.m4a",
//     text: "Daily notes from the standup",
//   },
//   {
//     id: "23",
//     date: "2025-10-28",
//     audioFile: "client_call.wav",
//     text: "Client feedback and next steps",
//   },
//   {
//     id: "24",
//     date: "2025-10-25",
//     audioFile: "lecture.mp3",
//     text: "Lecture on AI advancements",
//   },
// ];

// export default function HistoryScreen() {
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState(data);

//   const onSearch = (text: string) => {
//     setSearch(text);
//     if (text.trim() === "") {
//       setFiltered(data);
//     } else {
//       setFiltered(
//         data.filter(
//           (item) =>
//             item.date.includes(text) ||
//             item.audioFile.toLowerCase().includes(text.toLowerCase()) ||
//             item.text.toLowerCase().includes(text.toLowerCase())
//         )
//       );
//     }
//   };

//   const renderItem = ({ item }: { item: any }) => (
//     <View style={styles.row}>
//       <Text style={styles.date}>{item.date}</Text>
//       <Text style={styles.audio}>{item.audioFile}</Text>
//       <Text style={styles.text}>{item.text}</Text>
//       {/* <TouchableOpacity>
//         <MaterialIcons name="more-vert" size={22} color="#777" />
//       </TouchableOpacity> */}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.title}>Transcription History</Text>

//       {/* Search and Filter Row */}
//       <View style={styles.searchRow}>
//         <View style={styles.searchContainer}>
//           <MaterialIcons name="search" size={20} color="#888" />
//           <TextInput
//             placeholder="Search by date, file or text..."
//             placeholderTextColor="#aaa"
//             style={styles.searchInput}
//             value={search}
//             onChangeText={onSearch}
//           />
//         </View>
//         {/* <TouchableOpacity style={styles.filterButton}>
//           <MaterialIcons name="filter-list" size={22} color={accent} />
//           <Text style={styles.filterText}>Filter</Text>
//         </TouchableOpacity> */}
//       </View>

//       {/* Table Header */}
//       <View style={styles.headerRow}>
//         <Text style={[styles.headerText, { flex: 1 }]}>Date</Text>
//         <Text style={[styles.headerText, { flex: 1 }]}>Audio File</Text>
//         <Text style={[styles.headerText, { flex: 2 }]}>Translated Text</Text>
//         {/* <Text style={styles.headerText}></Text> */}
//       </View>

//       {/* Table Rows */}
//       <FlatList
//         data={filtered}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Pagination */}
//       {/* <View style={styles.pagination}>
//         <TouchableOpacity style={styles.pageButton}>
//           <Text style={styles.pageText}>{"<"}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.pageButton, styles.activePage]}>
//           <Text style={styles.activeText}>1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.pageButton}>
//           <Text style={styles.pageText}>{">"}</Text>
//         </TouchableOpacity>
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f8f8", padding: 16 },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: "#333",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     color: "#333",
//     fontSize: 15,
//     paddingVertical: 6,
//   },
//   filterButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: accent,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginLeft: 8,
//   },
//   filterText: {
//     color: accent,
//     fontWeight: "600",
//     marginLeft: 4,
//   },
//   headerRow: {
//     flexDirection: "row",
//     backgroundColor: "#f1f1f1",
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     marginBottom: 4,
//   },
//   headerText: {
//     color: colors.text,
//     fontWeight: "600",
//     fontSize: 15,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     marginBottom: 6,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   date: { flex: 1, color: "#444", fontSize: 14 },
//   audio: { flex: 1, color: accent, fontWeight: "500", fontSize: 14 },
//   text: { flex: 2, color: "#555", fontSize: 13 },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   pageButton: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     marginHorizontal: 4,
//   },
//   pageText: { color: "#555" },
//   activePage: { backgroundColor: accent, borderColor: accent },
//   activeText: { color: "#fff", fontWeight: "600" },
// });

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
import { colors } from "../../theme";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgEnd,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
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
    color: "#333",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  cardBody: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  transcribe: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
});
