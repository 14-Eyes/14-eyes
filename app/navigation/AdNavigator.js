import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SponsoredBy from "../screens/SponsoredBy";

const Stack = createStackNavigator();

const AdNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Sponsored"
      component={SponsoredBy}
	  headerMode="none"
      options={{ headerShown: false }}	  
	/>  
  </Stack.Navigator>
);

export default AdNavigator;