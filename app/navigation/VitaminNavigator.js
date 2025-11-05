import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EssentialNutrients from "../screens/EssentialNutrients";
import Vitamins from "../screens/Vitamins";
import Foods from "../screens/FoodsForVitamin";

//Create a new stack
const VitStack = createStackNavigator();

//stack contains the vitamins and foodforvitamin screens to navigate
const VitaminNavigator = () => (
  <VitStack.Navigator>
  <VitStack.Screen
	  name="EssentialNutrients"
      component={EssentialNutrients}
      options={{ title: "List of Vitamins & Minerals" }}
	/>
  <VitStack.Screen
	  name="FoodList"
      component={Foods}
      options={{ title: "List of Vitamins & Minerals" }}
	/>
  <VitStack.Screen
	  name="Vitamins"
      component={Vitamins}
      options={{ title: "List of Vitamins & Minerals" }}
	/>

  </VitStack.Navigator>
  );

export default VitaminNavigator;
