/**
special screen for the auth screens:
  - login
  - register
  - forgot password
 */

import React from "react";
import {Platform} from 'react-native';
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


function ScreenAuth({ children, style }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.screen, style]}
    >
      <View style={[styles.view, style]}>{children}</View>
      <View style={{ flex: 1 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "transparent",
  },
  view: {
    justifyContent: "flex-end",
  },
});

export default ScreenAuth;