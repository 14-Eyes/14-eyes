import React from "react";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { useNavigation } from '@react-navigation/native';

function ChildButtonLarge({ title, onPress, color = "eltrapricot", screenName }) {
    const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: colors[color] }]}
    >
      <AppText style={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    borderColor: colors.medium,
    borderRadius: 80,
    shadowColor: colors.white,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    alignItems: "center", 
    width: 280,
    height: 130,
    justifyContent:"center",
    padding: 25,
    margin: 5,
  },

  buttonText: {
    fontSize: 50,
    color: colors.dark,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textAlign:"center",
  },
});

export default ChildButtonLarge;
