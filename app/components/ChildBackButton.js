import React from "react";
import { StyleSheet, Platform, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function ChildBackButton({ title, onPress, color = "eltrgreen" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors[color] }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: "40%",
    width: 180,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export default ChildBackButton;
