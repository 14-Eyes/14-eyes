/**
 * This code handles the navigation logic for the app by determining whether a user is logged in and loading the appropriate screen flow.
 * 
 * If a user is logged in, the app loads a stack of navigators that organize sponsor content, core features, and child-related screens.
 * If no user is logged in, the app displays the authentication flow to handle login and account setup.
 * The entire navigation system is enclosed in a NavigationContainer, which applies a consistent visual theme, 
 * while AuthContext shares user data across all components.
 *
 * Updated for IntroVidScreeen integration.
 */

import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';

// import AppNavigator from "./app/navigation/AppNavigator";
// import ChildNavigator from "./app/navigation/ChildNavigator";
import RootNavigator from "./app/navigation/RootNavigator";

import navigationTheme from "./app/navigation/navigationTheme";
import AdNavigator from "./app/navigation/AdNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import { auth } from "./app/config/firebase";
import IntroVidScreeen from "./app/screens/IntroVidScreeen";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [showIntro, setShowIntro] = useState(false); // track if intro video should show

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('User Authenticated:', firebaseUser.email);
        setUser(firebaseUser);
        // Example: get showIntro from Firestore or user metadata
        // Here we assume a field `showIntro` exists in user's doc
        firebaseUser.getIdTokenResult().then(() => {
          // you can fetch the actual user doc and set showIntro accordingly
          setShowIntro(true); // temporary default for testing
        });
      } else {
        console.log('No authenticated user');
        setUser(null);
        setUsername(null);
        setShowIntro(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ user, setUser, username, setUsername }}>
        <NavigationContainer theme={navigationTheme}>
          {user ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="RootNavigator"
                component={RootNavigator}
              />
            </Stack.Navigator>
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}