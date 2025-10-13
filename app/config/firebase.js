// app/config/firebase.js

// NEW
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
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
