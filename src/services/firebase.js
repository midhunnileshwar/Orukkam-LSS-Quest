import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbaFZM8m0-K5IaNt55556U2Ym3AoXs7zE",
    authDomain: "orukkam-50e33.firebaseapp.com",
    projectId: "orukkam-50e33",
    storageBucket: "orukkam-50e33.firebasestorage.app",
    messagingSenderId: "557560406011",
    appId: "1:557560406011:web:5a2db9e32f485c1154f55e",
    measurementId: "G-1JLEV82JX8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, PhoneAuthProvider };
