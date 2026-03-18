// IntroVidScreeen.js
import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function IntroVidScreeen({ navigation }) {
  const player = useVideoPlayer(
    require("../assets/videos/introHuman.mp4"),
    (player) => {
      player.play();
    }
  );

  const handleFinish = async () => {
    try {
      player.pause();

      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          showIntro: false
        });
      }
    } catch (e) {
      console.log("Finish error:", e);
    }

    navigation.replace("AppNavigator");
  };

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
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
    backgroundColor: "red", // temporary for debug
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300, // fixed height avoids flex issues
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