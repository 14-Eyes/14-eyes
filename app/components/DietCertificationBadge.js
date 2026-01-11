// Component used to display each matched certified diet on the FoodDetails.js screen
// Similar style to the UltraProcessedMarker component

import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function DietCertificationBadge({ label }) {
  if (!label) return null;

  return (
    <View style={styles.badge}>
      <AppText style={styles.text}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    marginTop: 8,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: colors.eltrgreen,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.eltrgreen,
  },
});

export default DietCertificationBadge;