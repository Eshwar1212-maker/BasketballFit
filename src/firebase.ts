// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu5yBT8T8G2wCw_HLCqaB0DghuwTN-MNQ",
  authDomain: "capstone-ec476.firebaseapp.com",
  projectId: "capstone-ec476",
  storageBucket: "capstone-ec476.appspot.com",
  messagingSenderId: "92545002195",
  appId: "1:92545002195:web:e1fac7ad0be2113aed0226"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
export const provider = new GoogleAuthProvider();
