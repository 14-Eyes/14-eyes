// app/config/firebase.js

// NEW
import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import Constants from "expo-constants";
import { Platform } from 'react-native'; // <--- IMPORT Platform for Android check
// OLD
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/database";
// import "firebase/compat/firestore";
// import Constants from "expo-constants";

const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID,
} = Constants.expoConfig.extra;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase (avoid reinitialization)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// // Initialize Auth with persistence (needed for React Native)
// const auth =
//   initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });

// Initialize other services
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// Export for use in other files
export { app, auth, db, rtdb };

if (__DEV__) { // __DEV__ is true in development builds
  const EMULATOR_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  
  console.log(`[Firebase Config] Connecting to Auth Emulator at http://${EMULATOR_HOST}:9099`);
  connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`);

  // If you also want to connect Firestore to its emulator
  console.log(`[Firebase Config] Connecting to Firestore Emulator at http://${EMULATOR_HOST}:8080`);
  connectFirestoreEmulator(db, EMULATOR_HOST, 8080);

  // If you also want to connect Realtime Database to its emulator
  // console.log(`[Firebase Config] Connecting to Realtime Database Emulator at http://${EMULATOR_HOST}:9000`);
  // connectDatabaseEmulator(rtdb, EMULATOR_HOST, 9000);
}

export default app;

// OLD
// Initialize Firebase (avoid reinitialization)
// let Firebase;
// if (!firebase.apps.length) {
//   Firebase = firebase.initializeApp(firebaseConfig);
// } else {
//   Firebase = firebase.app();
// }

// export default Firebase;
// ------------------------

// import firebase from "firebase/compat";
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   MESSAGE_SENDER_ID,
//   APP_ID,
// } from "@env";

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: "",
//   messagingSenderId: MESSAGE_SENDER_ID,
//   appId: APP_ID,
// };

// // Initialize Firebase
// let Firebase = firebase.initializeApp(firebaseConfig);

// export default Firebase;
