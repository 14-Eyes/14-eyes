import React from "react";
import { StyleSheet, Platform, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", height = 50, borderRadius = 25 }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { height }, { borderRadius }, { backgroundColor: colors[color] }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    //height: 50,
    width: "100%",
    //borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export default AppButton;
