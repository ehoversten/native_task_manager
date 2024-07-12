// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3_ouIIuWXdg0dh2uTvjJ5XUDbA7fsp48",
  authDomain: "native-task-manager.firebaseapp.com",
  projectId: "native-task-manager",
  storageBucket: "native-task-manager.appspot.com",
  messagingSenderId: "410021381525",
  appId: "1:410021381525:web:effe548380065a05e7629c"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);