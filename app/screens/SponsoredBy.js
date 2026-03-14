import React, { useRef, useEffect, useContext } from "react";
import { Animated, View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../auth/context";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000, // 4-second fade
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ ...props.style, opacity: fadeAnim }}>{props.children}</Animated.View>;
};

function SponsoredBy() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const goNext = () => {
    if (user?.showIntro) {
      navigation.navigate("IntroVidScreen");
    } else {
      navigation.navigate("AppNavigator");
    }
  };

  useEffect(() => {
    const timer = setTimeout(goNext, 4000); // auto navigate after 4s
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* CROSS BUTTON - dark red X, slightly down and left */}
      <TouchableOpacity style={styles.closeButton} onPress={goNext}>
        <Text style={styles.crossText}>X</Text>
      </TouchableOpacity>

      {/* Fade-in images */}
      <FadeInView style={styles.fadeContainer}>
        <Image style={styles.logo} source={require("../assets/sponsoredby.png")} />
        <Image style={styles.sponsor} source={require("../assets/appsponsor.png")} />
        <Image style={styles.bottom} source={require("../assets/adamapple.png")} />
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  fadeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    position: "absolute",
    top: 60,   // moved slightly down from 40 → 60
    right: 40, // moved slightly left from 20 → 40
    zIndex: 1000,
  },

  crossText: {
    color: "#8B0000", // dark red
    fontSize: 28,
    fontWeight: "bold",
  },

  logo: {
    top: 65,
    width: 310,
    height: 240,
  },

  sponsor: {
    resizeMode: "contain",
    height: "50%",
    width: "100%",
  },

  bottom: {
    height: 90,
    width: 85,
    marginBottom: 40,
  },
});

export default SponsoredBy;