/**
special screen for the auth screens:
  - login
  - register
  - forgot password
 */

import React from "react";
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
} from "react-native";

function ScreenAuth({ children }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.screen]}
    >
      {children}
      {/* <View style={{ flex: 1 }} /> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  // view: {
  //   justifyContent: "center",
  // },
});

export default ScreenAuth;