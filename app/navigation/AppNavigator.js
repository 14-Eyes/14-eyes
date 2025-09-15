import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SponsoredBy from "../screens/SponsoredBy";
import Budgets from "../screens/BudgetPage";
import ScanButton from "./ScanButton";
import routes from "./routes";
import ScanNavigator from "./ScanNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FoodDye from "../screens/FoodDye";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Budget"
      component={Budgets}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="currency-usd" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ScanningScreen"
      component={ScanNavigator}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <ScanButton onPress={() => navigation.navigate(routes.SCAN_ITEM)} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="barcode-scan"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="About"
      component={AboutScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="information" color={color} size={size} />
        ),
      }}
    />
    
    <Tab.Screen
      name="Settings"
      component={SettingsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="settings-helper"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
