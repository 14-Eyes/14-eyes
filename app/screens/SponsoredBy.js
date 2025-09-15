import React, { useRef, useEffect, Component } from "react";
import { Animated, Text, View, Image, StyleSheet, resizeMode } from "react-native";

import routes from "../navigation/routes";
import CloseButton from "../components/CloseButton";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 6000,
		useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

{/* Change the appSponsor.png to change the image ad for the front page */ }

function SponsoredBy({ navigation }) {
  return (
    <View style={styles.container}>
	<FadeInView style={{flex:1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
	  <View style={styles.buttonContainer}>
		<CloseButton
		  title="X"
		  onPress={() => navigation.navigate(routes.APPNAVIGATOR)}
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
  container: {
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
  },
  logo: {
	top: 65,
	alignItems: "center",
	justifyContent: "center",
    width: 310,
    height: 240,
  },
  sponsor: {
	alignItems: "center",
	justifyContent: "center",
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
