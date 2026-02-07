// Screen layout to display each list for each harmful ingredient category

import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Text, Platform } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import choices from "../config/badlists";
import LineDivider from "../components/Divider";

//pulling the array/list elements from the appropriate list in the config file

export const HarmfulIngredientsSubScreen = ({route, navigation}) => {
  const foodList = route.params.food.mapToo

    return (
      <Screen style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AppText style={styles.title}>{route.params.food.label}</AppText>
          <AppText style={styles.italic}>{route.params.food.pageDesc}</AppText>
          <LineDivider />

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
  },
  scrollContent: {
    paddingTop: 10,      // adds space under header before text
    paddingHorizontal: 15,
    paddingBottom: 80,  // ensures content is above bottom nav bar
    alignItems: "center",
  },

  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 40,
    marginBottom: 15,
    marginTop: 0,
    textAlign: "center",
  },
  text: {
    fontSize: 21,
  },
  smallText: {
    fontSize: 16,
    // fontStyle: 'italic',
    textAlign: "center",
    color: colors.medium,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    top: 5,
    marginBottom: 8,
  },
  italic: {
    fontStyle: 'italic',
    // marginBottom: 20,
    fontSize: 15,
    textAlign: "center",
  },
  
});

//exporting the function

export default HarmfulIngredientsSubScreen;
