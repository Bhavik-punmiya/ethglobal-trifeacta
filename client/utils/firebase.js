// src/utils/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyCXKVWY6n9SuPLCLQkDG1P7wVuT8MdK8",
  authDomain: "decentralizedkaggle.firebaseapp.com",
  projectId: "decentralizedkaggle",
  storageBucket: "decentralizedkaggle.appspot.com", // Note: I fixed this URL
  messagingSenderId: "430176236491",
  appId: "1:430176236491:web:fdd64a879529c1ff2cfc4e",
};

// Initialize Firebase
let app;
let db;
let storage;
let auth;

// Check if we're in the browser environment
if (typeof window !== "undefined") {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
}

export { app, db, storage, auth };