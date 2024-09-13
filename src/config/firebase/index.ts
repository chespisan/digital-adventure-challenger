import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const {
  VITE_API_KEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINSENDERID,
  VITE_APPID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINSENDERID,
  appId: VITE_APPID,
};

const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase);

export default appFirebase;
