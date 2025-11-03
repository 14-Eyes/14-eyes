import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function RecipesScreen() {
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Recipes</AppText>
        <AppText style={styles.body}>
          Yippee recipes! Welcome in - you'll learn how to cook awesome recipes!!
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
    color: colors.eltrred,
  },
  body: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.dark,
  },
});

export default RecipesScreen;