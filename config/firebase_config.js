// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLbcgBQnX73MbPoVrBPZ-5sdqBBypadmo",
  authDomain: "emsp-c23e9.firebaseapp.com",
  projectId: "emsp-c23e9",
  storageBucket: "emsp-c23e9.firebasestorage.app",
  messagingSenderId: "917101989265",
  appId: "1:917101989265:web:23c09940789236d5e19e30",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
