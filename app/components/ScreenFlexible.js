import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from "expo-constants";

function ScreenFlexible({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>
    {children}
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
});

export default ScreenFlexible;
