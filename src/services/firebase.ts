import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAos57Ls9a2F5Dcl9ALelcrEMV4TbXgwLo",
    authDomain: "anhqv-note-clemente-1337.firebaseapp.com",
    projectId: "anhqv-note-clemente-1337",
    storageBucket: "anhqv-note-clemente-1337.firebasestorage.app",
    messagingSenderId: "857498246633",
    appId: "1:857498246633:web:cf1c182f0d63a0e459bf78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly');
googleProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');

export const facebookProvider = new FacebookAuthProvider();
