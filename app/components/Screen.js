import React from "react";
import {Platform} from 'react-native';
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

function Screen({ children, style }) {
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
  },
  view: {
    justifyContent: "flex-end",
  },
});

export default Screen;
