import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD2wkVre7drPJgNqoavlf91ngr4nUqP3D4",
  authDomain: "digital-adventure-api.firebaseapp.com",
  projectId: "digital-adventure-api",
  storageBucket: "digital-adventure-api.appspot.com",
  messagingSenderId: "690886475744",
  appId: "1:690886475744:web:9a16c7d60cae7e53377585",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
