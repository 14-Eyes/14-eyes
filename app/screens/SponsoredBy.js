import React, { useState, useEffect, useRef, useContext } from "react";
import { Animated, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import AuthContext from "../auth/context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return <Animated.View style={{ ...props.style, opacity: fadeAnim }}>{props.children}</Animated.View>;
};

const SponsoredBy = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [phase, setPhase] = useState("sponsor"); // sponsor | video
  const videoRef = useRef(null);

  // Auto-skip for old users immediately
  useEffect(() => {
    if (user && user.showIntro === false) {
      navigation.replace("AppNavigator");
    }
  }, [user]);

  // Auto-play video for new users
  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      videoRef.current.playAsync().catch((e) => console.log("Video play error:", e));
    }
  }, [phase]);

  const handleFinishVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.stopAsync();
    }
    if (user) {
      await updateDoc(doc(db, "users", user.uid), { showIntro: false });
    }
    navigation.replace("AppNavigator");
  };

  // Phase 1: Sponsor page
  if (phase === "sponsor") {
    return (
      <View style={styles.container}>
        <FadeInView
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image style={styles.logo} source={require("../assets/sponsoredby.png")} />
          <View style={styles.sponsor}>
            <Image style={styles.sponsor} source={require("../assets/appsponsor.png")} />
          </View>
          <Image style={styles.bottom} source={require("../assets/adamapple.png")} />

          {/* Top-right buttons: Cross and Skip */}
          {user && user.showIntro !== false && (
            <View style={styles.topRightButtons}>
              <TouchableOpacity style={styles.topBtn} onPress={() => setPhase("video")}>
                <Text style={styles.topBtnText}>X</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topBtn} onPress={handleFinishVideo}>
                <Text style={styles.topBtnText}>Skip</Text>
              </TouchableOpacity>
            </View>
          )}
        </FadeInView>
      </View>
    );
  }

  // Phase 2: Video
  if (phase === "video") {
    return (
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.fullScreenVideo}
          source={require("../assets/videos/introHuman.mp4")}
          resizeMode="contain"
          shouldPlay
          isLooping={false}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) handleFinishVideo();
          }}
        />

        {/* Top-right buttons: Cross and Skip */}
        <View style={styles.topRightButtons}>
          <TouchableOpacity style={styles.topBtn} onPress={handleFinishVideo}>
            <Text style={styles.topBtnText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logo: { top: 65, width: 310, height: 240 },
  sponsor: { width: "100%", height: "50%", resizeMode: "contain", alignItems: "center", justifyContent: "center" },
  bottom: { width: 85, height: 90, marginBottom: 40 },
  topRightButtons: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  topBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFB74D", // light orange
    borderRadius: 20,
    marginLeft: 5,
  },
  topBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  videoContainer: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center", width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
  fullScreenVideo: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
});

export default SponsoredBy;