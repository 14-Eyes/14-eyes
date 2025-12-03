import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";

export default function IntroVidScreen({ navigation }) {
  const videoRef = useRef(null);

  const handleFinish = async () => {
    // MUTE VIDEO BEFORE NAVIGATION
    try {
      if (videoRef.current) {
        await videoRef.current.setStatusAsync({ isMuted: true });
      }
    } catch (e) {
      console.log("Mute error:", e);
    }

    navigation.navigate("AppNavigator");
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={require("../assets/videos/introHuman.mp4")}
        resizeMode="contain"
        shouldPlay
        isMuted={false} // <-- Needed so we can change mute later
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            handleFinish();
          }
        }}
      />

      <TouchableOpacity style={styles.skipBtn} onPress={handleFinish}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "80%",
  },
  skipBtn: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    color: "white",
    fontSize: 18,
  },
});
