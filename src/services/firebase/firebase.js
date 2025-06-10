import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyClu2FKEN7w4ioS3UFZTscDS8u_2l0kSao",
  authDomain: "mealstogo-65d1f.firebaseapp.com",
  projectId: "mealstogo-65d1f",
  storageBucket: "mealstogo-65d1f.firebasestorage.app",
  messagingSenderId: "790951771955",
  appId: "1:790951771955:web:e30bf68230f3d4a5fa4846"
};


// ⚠️ Only initialize Firebase app once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // If auth is already initialized, fall back to getAuth()
  if (error.code === "auth/already-initialized") {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

export { auth, signInWithEmailAndPassword };