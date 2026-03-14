
/**
 * App.js
 *
 * Root of the app.
 * Decides which navigator to show based on authentication state and showIntro flag:
 * 1. AuthNavigator – if user is not logged in
 * 2. AdNavigator – if user is logged in and showIntro is true (plays intro video)
 * 3. AppNavigator – main app for logged-in users after intro video
 *
 * Firestore is used to store user info and the showIntro flag.
 * showIntro is automatically updated by IntroVidScreen once the video finishes or is skipped.
 */

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";

import navigationTheme from "./app/navigation/navigationTheme";
import AdNavigator from "./app/navigation/AdNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";

import { auth, db } from "./app/config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function App() {
  // Global state for authenticated user
  const [user, setUser] = useState();      // Firebase user object + Firestore data
  const [username, setUsername] = useState(); // Optional: store username separately

  /**
   * Listen for authentication state changes.
   * This hook runs once on mount.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      if (firebaseUser) {
        // User is logged in
        console.log("User Authenticated:", firebaseUser.email);

        try {
          // Reference to Firestore user document
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          let userData;

          // Case 1: Firestore document does not exist → create it
          if (!userSnap.exists()) {
            userData = {
              email: firebaseUser.email,
              username: null,
              showIntro: true, // First-time user always sees intro video
            };
            await setDoc(userRef, userData);

          } else {
            // Case 2: Document exists → load data
            userData = userSnap.data();

            // Safety: if showIntro is missing, default to true
            if (userData.showIntro === undefined) {
              userData.showIntro = true;
              await updateDoc(userRef, { showIntro: true });
            }
          }

          // Store username if available
          setUsername(userData.username || null);

          // Merge Firebase user and Firestore data
          setUser({
            ...firebaseUser,
            ...userData,
          });

        } catch (error) {
          console.log("USER LOAD ERROR:", error);
          // Even if Firestore fails, keep Firebase user to allow access
          setUser(firebaseUser);
        }

      } else {
        // User is logged out
        console.log("No authenticated user");
        setUser(null);
        setUsername(null);
      }
    });

    // Cleanup listener on unmount
    return unsubscribe;

  }, []);

  return (
    <SafeAreaProvider>
      {/* Provide auth state globally */}
      <AuthContext.Provider value={{ user, setUser, username, setUsername }}>
        <NavigationContainer theme={navigationTheme}>
          {user ? (
            // If logged in, decide which flow to show:
            user.showIntro ? (
              <AdNavigator />
            ) : (
              <AppNavigator />
            )
          ) : (
            // Not logged in → show AuthNavigator
            <AuthNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
