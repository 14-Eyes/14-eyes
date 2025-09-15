import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Vitamins from "../screens/Vitamins";
import Foods from "../screens/FoodsForVitamin";

//Create a new stack
const VitStack = createStackNavigator();

//stack contains the vitamins and foodforvitamin screens to navigate
const VitaminNavigator = () => (
  <VitStack.Navigator>
  <VitStack.Screen
	  name="Vitamins"
      component={Vitamins}
      options={{ title: "List of Vitamins & Minerals" }}
	/>
  <VitStack.Screen
    name="GoodFood"
      component={Foods}
      options={{ title: "List of High Vitamin Food Sources" }}
  />

  </VitStack.Navigator>
  );

export default VitaminNavigator;
