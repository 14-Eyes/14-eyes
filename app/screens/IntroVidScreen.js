import React, { useRef, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import AuthContext from "../auth/context";

export default function IntroVidScreen() {
  const videoRef = useRef(null);

  // Access global user state
  const { user, setUser } = useContext(AuthContext);

  const handleFinish = async () => {
    try {
      // Mute video when finishing
      if (videoRef.current) {
        await videoRef.current.setStatusAsync({ isMuted: true });
      }

      const firebaseUser = auth.currentUser;

      if (firebaseUser) {
        // Update Firestore so intro never shows again
        await updateDoc(doc(db, "users", firebaseUser.uid), {
          showIntro: false,
        });

        // Update local state so App.js re-renders immediately
        setUser({
          ...user,
          showIntro: false,
        });
      }
    } catch (e) {
      console.log("Mute or update error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={require("../assets/videos/introHuman.mp4")}
        resizeMode="contain"
        shouldPlay
        isMuted={false}
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