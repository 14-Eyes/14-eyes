//importing all the necessary items

import React from "react";
import { FlatList, StyleSheet, View, ScrollView, TouchableOpacity, Platform, Text } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import cats from "../config/categories";

const foods = cats.foodCategories;

//pulling the array/list elements from the appropriate list in the config file

function EssentialNutrients({navigation}) {

    return (
      <Screen style={styles.container}>
	    <ScrollView>
          <AppText style={styles.title}>Nutrients in Everyday Foods</AppText>
          <AppText style={styles.italic}>The following are various foods found in most grocery stores and restaurants that contain vitamins and minerals essential to your health.</AppText>

          <View style={styles.listContainer}>
          {foods.map(food => (
            <View style={styles.buttonContainer} key={food.id}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('FoodList',{food: food})}
                  style={[styles.button, { backgroundColor: food.buttonColor }]}
                  >
                    <Text style={styles.buttonText}>{food.label}</Text>
                  </TouchableOpacity>
                  <Text style={styles.buttonSmallText}>{food.desc}</Text>
            </View>
          ))}
          </View>
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
    color: 'black',
    fontSize: 40,
    marginBottom: 5,
    marginTop: 0,
    textAlign: "center",
  },
  italic: {
    fontStyle: 'italic',
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row', // Align children horizontally
    flexWrap: 'wrap',
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
  buttonSmallText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: "center",
    color: colors.medium,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  
});

//exporting the function

export default EssentialNutrients;