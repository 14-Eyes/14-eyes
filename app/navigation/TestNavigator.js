// app/navigation/TestNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

function Screen1() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Screen 1</Text>
    </View>
  );
}

function Screen2() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Screen 2</Text>
    </View>
  );
}

export default function TestNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="One" component={Screen1} />
      <Tab.Screen name="Two" component={Screen2} />
    </Tab.Navigator>
  );
}
