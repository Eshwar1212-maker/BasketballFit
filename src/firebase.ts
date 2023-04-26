// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain:"capstone-ec476.firebaseapp.com",
  projectId: "capstone-ec476",
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_APP_ID
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
export const provider = new GoogleAuthProvider();
