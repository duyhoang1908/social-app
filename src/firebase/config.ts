// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWqecr6h17hGhg3ahV6YrouNB6C0LxOCQ",
  authDomain: "social-app-3a5a5.firebaseapp.com",
  projectId: "social-app-3a5a5",
  storageBucket: "social-app-3a5a5.appspot.com",
  messagingSenderId: "446925752051",
  appId: "1:446925752051:web:d43196d1eb35b44637d986",
  measurementId: "G-PZWBFXPEJ0",
  databaseURL: "https://social-app-3a5a5-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const realtimeDB = getDatabase();
