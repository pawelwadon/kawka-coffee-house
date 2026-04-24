import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "kawkaapp.firebaseapp.com",
  projectId: "kawkaapp",
  storageBucket: "kawkaapp.firebasestorage.app",
  messagingSenderId: "1008370178045",
  appId: "1:1008370178045:web:a87810c73d50dc43b52b94"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
