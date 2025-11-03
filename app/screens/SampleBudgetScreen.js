import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function SampleBudgetScreen() {
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Sample Budgets</AppText>
        <AppText style={styles.body}>
          Here are sample grocery budgets for different spending levels.
          Use these as a starting point and adjust based on your lifestyle and location.
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
    color: colors.eltrpink,
  },
  body: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.dark,
  },
});

export default SampleBudgetScreen;
