// Horizontal divider component - can be used on any app screen by importing and
// adding "<LineDivider />" where you want the line to be

import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export default function LineDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1.5,
    backgroundColor: colors.medium,
    marginVertical: 24,
    width: "100%",
    borderRadius: 1,
  },
});