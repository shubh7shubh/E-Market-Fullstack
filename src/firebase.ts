// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "mern-emarket.firebaseapp.com",
    projectId: "mern-emarket",
    storageBucket: "mern-emarket.appspot.com",
    messagingSenderId: "81454802460",
    appId: "1:81454802460:web:d6957137afc7bf4e5821d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);