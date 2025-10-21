import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  //Text,
  View,
  Platform,
} from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={Platform.OS === "android" ? 1 : 5}
      style={styles.background}
      source={require("../assets/welcome.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/eltrRainbow.png")}
        ></Image>
      </View>
      <AppText style={styles.text}>
        To keep your health information private, we require log in with each use.
      </AppText>
      <View style={styles.buttonContainer}>
        <AppButton
          title="login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="register"
          onPress={() => navigation.navigate(routes.REGISTER)}
          color="secondary"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  logoContainer: {
    top: 70,
    position: "absolute",
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 250,
  },
  tagline: {
    fontSize: 25,
    color: colors.black,
    fontWeight: "600",
    paddingVertical: 20,
    },
    text: {
    color: colors.medium,
        fontSize: 20,
    textAlign: "center",
    }
});

export default WelcomeScreen;
