import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Text } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import vit from "../config/vitaminlist";
import routes from "../navigation/routes";
import { FoodsForVitamin } from "./FoodsForVitamin";

const vitamins = vit.vitamins;

//Displays list of vitamins and minerals
//When pressed, send the individual vitamin object to the FoodsForVitamin screen
function Vitamins({navigation}) {
    return (
      <Screen style={styles.container}>
	    <ScrollView>
          <AppText style={styles.title}>Nutrients in Everyday Foods</AppText>
          <AppText style={styles.italic}>Description of the stuff and what's going on here</AppText>
          {vitamins.map(vitamin => (
          <AppText style={styles.text} key={vitamin.id}
          onPress={() => navigation.navigate('GoodFood',{vitamin: vitamin})}>{vitamin.label}</AppText>
          ))}
	    </ScrollView>
      </Screen>
    );
}

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
    color: colors.buttongreen,
    fontSize: 40,
    marginBottom: 0,
    marginTop: 0,
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    textDecorationLine: 'underline',
    color: colors.buttongreen
  },
  italic: {
    fontStyle: 'italic',
    textAlign: "center",
    marginBottom: 20,
    fontSize: 15,
  },
  
});

export default Vitamins;