import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZkPTbNVAZkt1CoV_Vpfj5rrPpZrt_B5M",
    authDomain: "anhqv-note-app.firebaseapp.com",
    projectId: "anhqv-note-app",
    storageBucket: "anhqv-note-app.firebasestorage.app",
    messagingSenderId: "49865958912",
    appId: "1:49865958912:web:a75e6a5f6ae3da58fb5ae5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly');
googleProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');

export const facebookProvider = new FacebookAuthProvider();
