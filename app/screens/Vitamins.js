import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Text, Platform, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";
//import vit from "../config/vitaminlist";
import routes from "../navigation/routes";
import { FoodsForVitamin } from "./FoodsForVitamin";
import cats from "../config/categories";

//const vitamins = vit.vitamins;
const categories = cats.foodCategories;

//Displays list of vitamins and minerals
//When pressed, send the individual vitamin object to the FoodsForVitamin screen
export const Vitamins = ({route, navigation}) => {

  const vit = route.params.vitamin;

    return (
      <Screen style={styles.container}>
	    <ScrollView>
          <AppText style={styles.title}>{vit.label}</AppText>
          <AppText style={styles.italic}>{vit.use}</AppText>

          <AppText style={styles.italic}>Commonly found in...</AppText>

          <View style={styles.listContainer}>
          {vit.linkTo.map(Food => (
            <View style={styles.buttonContainer} key={Food.toString()}>
              <TouchableOpacity
              onPress={() => navigation.navigate('FoodList',{food: categories[Food]})}
              style={[styles.button, { backgroundColor: categories[Food].buttonColor }]}
              >
                <Text style={styles.buttonText}>{categories[Food].label}</Text>
              </TouchableOpacity>
          </View>
          ))}
          </View>

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
    textTransform: "uppercase",
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
  buttonText: {
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: 'center', // Push items to the right end of the row
    alignItems: 'center', // Optionally, center items vertically
    padding: 10,
    width: '50%',
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.eltrpink,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    position: 'absolute',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row', // Align children horizontally
    flexWrap: 'wrap',
  },
  
});

export default Vitamins;