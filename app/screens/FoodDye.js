//importing all the necessary items

import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import choices from "../config/badlists";

const dyeChoices = choices.dyeChoices;

//pulling the array/list elements from the appropriate list in the config file

function FoodDye({navi}) {
    return (
      <Screen style={styles.screen}>
        <AppText style={styles.title}>List of Food Dyes</AppText>
        
        {dyeChoices.map(dye => (
          <AppText style={styles.text} key={dye.id}>{dye.label}</AppText>
        ))}

      
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
    color: colors.buttonblue,
    fontSize: 38,
    marginBottom: 20,
    marginTop: 30,
  },
  text: {
    color: colors.buttonblue,
    fontSize: 20,
  },
  
});

//exporting the function

export default FoodDye;