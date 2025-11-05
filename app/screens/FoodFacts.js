//importing all the necessary items

import React from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import choices from "../config/badlists";

const sugars = choices.sugars;

//pulling the array/list elements from the appropriate list in the config file

function FoodFacts({navi}) {
    return (
      <Screen style={styles.container}>
	    <ScrollView>
          <AppText style={styles.title}>Food Facts</AppText>
          <AppText style={styles.italic}>Probably put good fats and good sugars here eventually</AppText>
	    </ScrollView>
      </Screen>
    );
}

//How the list, title, and background will look on the screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: colors.light,
  },
  title: {
    color: colors.buttonpink,
    fontSize: 40,
    marginBottom: 5,
    marginTop: 0,
    textAlign: "center",
  },
  text: {
    color: colors.buttonpink,
    fontSize: 20,

  },
  italic: {
    fontStyle: 'italic',
    textAlign: "left",
    marginBottom: 10,
    fontSize: 14,
  },
  
});

//exporting the function

export default FoodFacts;