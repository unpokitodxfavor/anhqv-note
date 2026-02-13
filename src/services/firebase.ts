import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTzJciI60VbYpY8nxPpgyA10qDQp1Q6Ek",
    authDomain: "anhqv-note.firebaseapp.com",
    projectId: "anhqv-note",
    storageBucket: "anhqv-note.firebasestorage.app",
    messagingSenderId: "339552210092",
    appId: "1:339552210092:web:87e03fa957307ca6b76309",
    measurementId: "G-LJT59QPP5M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly');
googleProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');

export const facebookProvider = new FacebookAuthProvider();
