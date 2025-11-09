
/**
 * AppNavigator.js
 *
 * This file defines the main bottom tab navigation for the 14 Eyes app.
 * It connects all core sections of the app into accessible tabs:
 * - Home: Main dashboard via HomeNavigator
 * - Budget: User spending and tracking
 * - Scan: Barcode scanner (via ScanButton)
 * - Recipes: Educational content / resources
 * - Settings: User preferences, account management
 *
 * Each tab uses MaterialCommunityIcons for clear, intuitive icons.
 * Navigation headers are disabled globally for design consistency.
 *
 * Updated to fix the “createBottomTabNavigator doesn’t exist” error
 * by importing from @react-navigation/bottom-tabs.
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// --- Navigators & Screens ---
import HomeNavigator from "./HomeNavigator";
import BudgetNavigator from "./BudgetNavigator";
import ScanNavigator from "./ScanNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AboutScreen from "../screens/AboutScreen";

// --- Components ---
import ScanButton from "./ScanButton";
import routes from "./routes";

console.log("✅ createBottomTabNavigator is available:", typeof createBottomTabNavigator);

// --- Initialize Bottom Tab Navigator ---
const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#4B9CD3", // active tab color
      tabBarInactiveTintColor: "gray",  // inactive tab color
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopWidth: 0.3,
        borderTopColor: "#ddd",
        paddingBottom: 4,
        height: 60,
      },
    }}
  >
    {/* --- Home Tab --- */}
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />

    {/* --- Budget Tab --- */}
    <Tab.Screen
      name="Budget"
      component={BudgetNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="currency-usd" color={color} size={size} />
        ),
      }}
    />

    {/* --- Scan Tab --- */}
    <Tab.Screen
      name="Scan"
      component={ScanNavigator}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <ScanButton onPress={() => navigation.navigate(routes.SCAN_ITEM)} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="barcode-scan" color={color} size={size} />
        ),
      })}
    />

    {/* --- Recipes / About Tab --- */}
    <Tab.Screen
      name="Recipes"
      component={AboutScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="book-open-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />

    {/* --- Settings Tab --- */}
    <Tab.Screen
      name="Settings"
      component={SettingsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
