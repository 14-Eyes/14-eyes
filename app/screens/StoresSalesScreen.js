import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function StoresSalesScreen() {
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Stores & Sales</AppText>
        <AppText style={styles.body}>
            Yippee local stores! Welcome in - you'll discover local stores, current sales, and shopping strategies to maximize
          your savings while keeping quality in mind.
        </AppText>
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
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.eltrblue,
  },
  body: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.dark,
  },
});

export default StoresSalesScreen;
