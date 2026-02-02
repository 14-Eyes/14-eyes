import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getSubScreenHeader } from "./HeaderStyles";

import HarmfulIngredients from "../screens/HarmfulIngredients";
import HarmfulIngredientsSubScreen from "../screens/HarmfulIngredientsSubScreen";

//Create a new stack
const BadStack = createStackNavigator();

//stack contains the vitamins and foodforvitamin screens to navigate
const BadListNavigator = () => (
  <BadStack.Navigator>
  <BadStack.Screen
	  name="HarmfulIngredients"
      component={HarmfulIngredients}
      options={({ navigation }) => getSubScreenHeader(navigation, "Harmful Ingredients")}
	/>
  <BadStack.Screen
	  name="HarmfulIngredientsSubScreen"
      component={HarmfulIngredientsSubScreen}
      options={({ navigation }) => getSubScreenHeader(navigation, "Harmful Ingredient List")}
	/>
  </BadStack.Navigator>
  );

export default BadListNavigator;
