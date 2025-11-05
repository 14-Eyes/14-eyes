//importing all the necessary items

import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Text, Platform } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import choices from "../config/badlists";

//pulling the array/list elements from the appropriate list in the config file

export const Sugars = ({route, navigation}) => {
  const foodList = route.params.food.mapToo

    return (
      <Screen style={styles.container}>
	    <ScrollView>
          <AppText style={styles.title}>{route.params.food.label}</AppText>
            <AppText style={styles.italic}>{route.params.food.pageDesc}</AppText>
        
          {foodList.map(food => (
            <View style={styles.listContainer} key={food.id}>
              <AppText style={styles.text}>{food.label}</AppText>
              <Text style={styles.smallText}>{food.why}</Text>
            </View>
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
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 40,
    marginBottom: 5,
    marginTop: 0,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: "center",
    color: colors.medium,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    top: 5,
  },
  italic: {
    fontStyle: 'italic',
    textAlign: "left",
    marginBottom: 10,
    fontSize: 14,
  },
  
});

//exporting the function

export default Sugars;
