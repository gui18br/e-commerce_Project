import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvsV1fSpxfeqzwU-yz2kzcFg0wzHQZ2Cs",
  authDomain: "e-commerce-8c3bf.firebaseapp.com",
  projectId: "e-commerce-8c3bf",
  storageBucket: "e-commerce-8c3bf.appspot.com",
  messagingSenderId: "23892608554",
  appId: "1:23892608554:web:5c144e3084f2da947c2553",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
