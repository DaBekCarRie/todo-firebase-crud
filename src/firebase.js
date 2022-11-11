// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPob9yDx6RNquBDhYiqd1ywCPfcZ5SQIA",
  authDomain: "todo-firebaes-crud.firebaseapp.com",
  projectId: "todo-firebaes-crud",
  storageBucket: "todo-firebaes-crud.appspot.com",
  messagingSenderId: "929006815476",
  appId: "1:929006815476:web:12519512a3e38fe07076a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)