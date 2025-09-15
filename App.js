import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import navigationTheme from "./app/navigation/navigationTheme";
import AdNavigator from "./app/navigation/AdNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import ChildNavigator from "./app/navigation/ChildNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser, username, setUsername }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? (
          <Stack.Navigator>
		    <Stack.Screen
              name="App Sponsor"
              component={AdNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AppNavigator"
              component={AppNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChildNavigator"
              component={ChildNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
