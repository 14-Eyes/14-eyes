import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getMainHeader, getSubScreenHeader } from "./HeaderStyles";

import SettingsScreen from "../screens/SettingsScreen";
import AccountNavigator from "../navigation/AccountNavigator";
import ChildAlert from "../screens/ChildMode/ChildAlert";
import AboutScreen from "../screens/AboutScreen";
import HelpScreen from "../screens/HelpScreen";
import BiometricAuthScreen from "../screens/BiometricAuthScreen"; // ← import biometric screen

const Stack = createStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 18 },
      headerStyle: { backgroundColor: "white" },
    }}
  >
    {/* MAIN SETTINGS SCREEN */}
    <Stack.Screen
      name="SettingsHome"
      component={SettingsScreen}
      options={getMainHeader("Settings")}
    />

    {/* BIOMETRIC SCREEN */}
    <Stack.Screen
      name="BiometricAuthScreen" // ← must match navigation.navigate()
      component={BiometricAuthScreen}
      options={{ headerShown: false }} // full-screen
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