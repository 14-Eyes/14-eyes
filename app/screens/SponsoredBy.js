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

function SponsoredBy({ navigation }) {
  return (
    <View style={styles.container}>
	<FadeInView style={{flex:1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
	  <View style={styles.buttonContainer}>
		<CloseButton
		  title="X"
		  onPress={() => navigation.replace("RootNavigator")}
	    />
	  </View>
      <Image
        style={styles.logo}
        source={require("../assets/sponsoredby.png")}
      ></Image>
	  <View style={styles.sponsor}>
		<Image
		  style={styles.sponsor}
		  source={require("../assets/appsponsor.png")}
		></Image>
	  </View>
	  	<Image
		  style={styles.bottom}
		  source={require("../assets/adamapple.png")}
		></Image>
		</FadeInView>
	</View>
  );
}

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