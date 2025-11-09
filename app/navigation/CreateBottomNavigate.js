// app/navigation/CreateBottomNavigate.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import FeedScreen from "../screens/FeedScreen";
import ScanScreen from "../screens/ScanScreen"; // create a simple placeholder if missing
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

export default function CreateBottomNavigate() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2f95dc",
        tabBarInactiveTintColor: "#666",
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Feed") iconName = "home";
          else if (route.name === "Scan") iconName = "qr-code-scanner";
          else if (route.name === "Account") iconName = "person";
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
