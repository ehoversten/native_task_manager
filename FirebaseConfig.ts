// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// console.log("APP: ", FIREBASE_APP);
// Initalize Auth
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// Initalize Services
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// console.log("DB: ", FIRESTORE_DB);