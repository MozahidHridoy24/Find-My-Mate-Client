// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmphjcTlrSfwNAaE9xpRCjMZrYcdmTKsg",
  authDomain: "find-my-mate-24.firebaseapp.com",
  projectId: "find-my-mate-24",
  storageBucket: "find-my-mate-24.firebasestorage.app",
  messagingSenderId: "981553133706",
  appId: "1:981553133706:web:935cb5f982195ee5835573",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
