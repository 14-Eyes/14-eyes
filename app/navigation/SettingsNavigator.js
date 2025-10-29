import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getMainHeader, getSubScreenHeader } from "./HeaderStyles";

import SettingsScreen from "../screens/SettingsScreen";
import AccountNavigator from "../navigation/AccountNavigator";
import ChildAlert from "../screens/ChildMode/ChildAlert";
import AboutScreen from "../screens/AboutScreen";
import HelpScreen from "../screens/HelpScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center", // center the title
      headerTitleStyle: { fontSize: 18 },
      headerStyle: { backgroundColor: "white" },
    }}
  >  
    <Stack.Screen
	    name="SettingsHome"
      component={SettingsScreen}
      options={getMainHeader("Settings")}
	  />

    {/* SUB SCREENS */}
    <Stack.Screen
      name="AccountDetails"
      component={AccountNavigator}
      options={{ headerShown: false }}
	  />
    <Stack.Screen
      name="ChildAlert"
      component={ChildAlert}
	    options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AboutScreen"
      component={AboutScreen}
      options={({ navigation }) => getSubScreenHeader(navigation, "About")}	  
    />
    <Stack.Screen
      name="HelpScreen"
      component={HelpScreen}
      options={({ navigation }) => getSubScreenHeader(navigation, "FAQ")}	  
    />
  </Stack.Navigator>
);

export default SettingsNavigator;