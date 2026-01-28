import React from "react";
import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import LineDivider from "../components/Divider"; // Horizontal divider
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

const { height } = Dimensions.get("window");

function StoresSalesScreen() {
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Stores & Sales</AppText>

        <AppText style={styles.body}>
          Discover weekly deals and sales from grocery stores near you.
        </AppText>

        <AppText style={styles.note}>
          Deals are provided by Flipp and other third-party retailers.
        </AppText>

        <LineDivider />

        {/* Flipp Weekly Deals */}
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: "https://flipp.com" }}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
          />
        </View>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.eltrblue,
  },
  body: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 10,
    color: colors.dark,
  },
  note: {
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
    marginTop: 15,
    color: colors.dark,
  },
  webViewContainer: {
    height: 600, // height of web view container
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
});

export default StoresSalesScreen;
