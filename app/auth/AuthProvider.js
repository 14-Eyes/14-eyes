import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, reload } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

// Create global auth context
export const AuthContext = createContext();

/**
 * AuthProvider manages authentication state for the entire app.
 * It listens to Firebase Auth, stores the user object,
 * and exposes global login/logout user data across the whole app.
 *
 * IMPORTANT:
 * This file must NEVER contain UI, styling, screens, or React Navigation.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fix stuck pendingEmail by forcing a refresh
          await reload(firebaseUser);

          // Fetch extra user profile data from Firestore
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUsername(userSnap.data().username || null);
          }

          setUser(firebaseUser);
        } catch (err) {
          console.log("AUTH REFRESH ERROR:", err);
          setUser(firebaseUser); // still set user
        }
      } else {
        // Logged out
        setUser(null);
        setUsername(null);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const authValue = {
    user,
    setUser,
    username,
    setUsername,
    initializing,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
