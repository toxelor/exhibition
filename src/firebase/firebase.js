import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBDeNA_kTlxUZZ5V_B7qmHEWLpOzU1fw_Q",
  authDomain: "exhibition-78ebb.firebaseapp.com",
  projectId: "exhibition-78ebb",
  storageBucket: "exhibition-78ebb.firebasestorage.app",
  messagingSenderId: "717700528358",
  appId: "1:717700528358:web:0f81c23e9466eec85ba327",
  measurementId: "G-42VGND9EHY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app);