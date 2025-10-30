import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Energy from "../screens/EnergyPage";
import fa from "../screens/Fats";
import FoodDye from "../screens/FoodDye";
import Preservatives from "../screens/Preservatives";
import Sugars from "../screens/Sugars";
import Vitamins from "../screens/Vitamins";
import EssentialNutrients from "../screens/EssentialNutrients";
import HarmfulIngredients from "../screens/HarmfulIngredients";
import FoodFacts from "../screens/FoodFacts";
import Budgets from "../screens/BudgetPage";
import Home from "../screens/Home";
import VitaminNavigator from "./VitaminNavigator";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
	  name="HomeScreen"
      component={Home}
      options={{ title: "Home" }}
	/>
    <Stack.Screen
	  name="EssentialNutrients"
      component={EssentialNutrients}
      options={{ title: "Essential Nutrients" }}
	/>
    <Stack.Screen
	  name="HarmfulIngredients"
      component={HarmfulIngredients}
      options={{ title: "Harmful Ingredients" }}
	/>
    <Stack.Screen
	  name="FoodFacts"
      component={FoodFacts}
      options={{ title: "Food Facts" }}
	/>
    <Stack.Screen
	  name="FoodDye"
      component={FoodDye}
      options={{ title: "List of Food Dyes" }}
	/>
    <Stack.Screen
	  name="Preservatives"
      component={Preservatives}
      options={{ title: "List of Preservatives" }}
	/>
  <Stack.Screen
	  name="Sugars"
      component={Sugars}
      options={{ title: "List of Sugars" }}
	/>
  <Stack.Screen
	  name="Vitamins"
      component={VitaminNavigator}
      options={{ title: "List of Vitamins & Minerals" }, {headerShown: false}}
	/>
  <Stack.Screen
    name="Budgets"
      component={Budgets}
      options={{ title: "Budgeting Plans" }}
  />
   <Stack.Screen
    name="Fats"
      component={fa} //
      options={{ title: "List of Healthy Fats" }}
  />
 <Stack.Screen
    name="Energy"
      component={Energy} //
      options={{ title: "List of Energy-Filled Foods" }}
  />

  </Stack.Navigator>
  );

export default HomeNavigator;
