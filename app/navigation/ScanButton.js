import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";

function ScanButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="barcode-scan"
          color={colors.white}
          size={30}
        />
        <AppText style={styles.text}>Scan Now!</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 40,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  text: {
    fontSize: 9,
    color: colors.white,
    fontWeight: "bold",
  }
});

export default ScanButton;
