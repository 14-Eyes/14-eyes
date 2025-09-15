import React from "react";
import { StyleSheet, Platform, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function ChildButtonSmall({ title, onPress, color = "eltrlightpink" }) {
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
    borderWidth: 0.5,
    borderColor: colors.medium,
    borderRadius: 50,
    shadowColor: colors.white,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
      shadowRadius: 4,
      alignItems: "center", 
      width: 140,
      height: 180,
      justifyContent:"center",
      margin: 5
      //padding: 25,
      //marginVertical: 10,
  },

  buttonText: {
    fontSize: 24,
    color: colors.dark,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textAlign:"center",
  },
});

export default ChildButtonSmall;
