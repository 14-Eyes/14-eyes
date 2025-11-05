import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HarmfulIngredients from "../screens/HarmfulIngredients";
import Sugars from "../screens/Sugars";

//Create a new stack
const BadStack = createStackNavigator();

//stack contains the vitamins and foodforvitamin screens to navigate
const BadListNavigator = () => (
  <BadStack.Navigator>
  <BadStack.Screen
	  name="HarmfulIngredients"
      component={HarmfulIngredients}
      options={{ title: "List of Vitamins & Minerals" }}
	/>
  <BadStack.Screen
	  name="Sugars"
      component={Sugars}
      options={{ title: "List of Vitamins & Minerals" }}
	/>
  </BadStack.Navigator>
  );

export default BadListNavigator;
