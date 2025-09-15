//importing all the necessary items

import React from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import en from "../config/energylist";

const energy = en.energy;

//pulling the array/list elements from the appropriate list in the config file

function Energy({navi}) {
    return (
      <Screen style={styles.container}>
	    <ScrollView>
          <AppText style={styles.title}>List of Energy-Filled Foods for Athletes</AppText>
        
          {energy.map(ener => (
			<AppText style={styles.text} key={ener.id}>{ener.label}</AppText>
          ))}
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
    color: colors.buttonorange,
    fontSize: 30,
    marginBottom: 12,
    marginTop: 0,
    textAlign: "center",
  },
  text: {
    color: colors.buttonorange,
    fontSize: 20,
  },
  
});

//exporting the function

export default Energy;