import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DriveThru from "../screens/ChildMode/DriveThru";
import DriveThruWelcome from "../screens/ChildMode/DriveThruWelcome";
import DriveThruDecision from "../screens/ChildMode/DriveThruDecision";

//Create a new stack
const DriveStack = createStackNavigator();

//stack contains the various parts of the drive thru game
const DriveThruNavigator = () => (
  <DriveStack.Navigator>
    <DriveStack.Screen
	  name="DriveThruWelcome"
      component={DriveThruWelcome}
      options={{ title: "Welcome Screen to Game", headerShown: false }}
	/>
    <DriveStack.Screen
	  name="DriveThru"
      component={DriveThru}
      options={{ title: "Character and Transportation Choice", headerShown: false}}
	/>
    <DriveStack.Screen
	  name="DriveThruDecision"
      component={DriveThruDecision}
      options={{ title: "Fast Food Restaurant Choice", headerShown: false}}
	/>
  </DriveStack.Navigator>
  );

export default DriveThruNavigator;
