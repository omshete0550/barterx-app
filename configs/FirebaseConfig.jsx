// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJi4E7j3jo_lJlL4BLOGQEbArfieNezjk",
  authDomain: "barterx-c306c.firebaseapp.com",
  projectId: "barterx-c306c",
  storageBucket: "barterx-c306c.appspot.com",
  messagingSenderId: "761084933563",
  appId: "1:761084933563:web:af14b0aa295bf690f6c09e",
  measurementId: "G-TCMG2Y6P2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);