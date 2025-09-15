import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScanningScreen from "../screens/ScanningScreen";
import FoodDetails from "../screens/FoodDetails";

const Stack = createStackNavigator();

const ScanNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="ScanningScreen" component={ScanningScreen} />
    <Stack.Screen name="FoodDetails" component={FoodDetails} />
  </Stack.Navigator>
);

export default ScanNavigator;
