// FOLLOWING SECTION IS NEW CODE
/*  I was trying to test out the new SafeAreaView package and
    see if I could standardize the formatting accross all screens.
    The formatting was getting a bit wonky and this is out of scope 
    for my tasks right now but I want to come back to this...
*/

import React from "react";
import { Platform, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

function AccountScreen({ children, style }) {
  return (
    <SafeAreaView
      style={[styles.safeArea]}
      edges={["top", "left", "right"]} // ensures full device coverage (minus bottom)
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.screen, style]}
      >
        <View style={[styles.view, style]}>{children}</View>
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#af2a2aff",
  },
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default AccountScreen; 
