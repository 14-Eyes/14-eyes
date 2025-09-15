import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChildHome from "../screens/ChildMode/ChildHome";
import ChildScan from "../screens/ChildMode/ChildScan";
import ChildBadges from "../screens/ChildMode/ChildBadges";
import ChildFood from "../screens/ChildMode/ChildFood";
import ChildFoodAbout from "../screens/ChildMode/ChildFoodAbout";
import ChildChangeMode from "../screens/ChildMode/ChildChangeMode";
import DriveThruNavigator from "../navigation/DriveThruNavigator";
import BadgeScreen from "../screens/ChildMode/BadgeScreen";

const Stack = createStackNavigator();

const ChildNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={ChildHome}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Scan" component={ChildScan} />
    <Stack.Screen 
      name="DriveThru" 
      component={DriveThruNavigator}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="ChildBadges"
      component={ChildBadges}
      options={{ headerShown: false }} />

    <Stack.Screen 
      name="ChildFood" 
      component={ChildFood}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChildFoodAbout"
      component={ChildFoodAbout}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChildChangeMode"
      component={ChildChangeMode}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="BadgeScreen" 
      component={BadgeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ChildNavigator;