// app/auth/AuthProvider.js
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, reload } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await reload(firebaseUser);
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          let userData;

          if (!userSnap.exists()) {
            userData = { email: firebaseUser.email, username: null, showIntro: true };
            await setDoc(userRef, userData);
          } else {
            userData = userSnap.data();
            if (userData.showIntro === undefined) {
              userData.showIntro = true;
              await updateDoc(userRef, { showIntro: true });
            }
          }

          setUsername(userData.username || null);
          setUser({ ...firebaseUser, ...userData });

        } catch (err) {
          console.log("AUTH REFRESH ERROR:", err);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
        setUsername(null);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, username, setUsername, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}