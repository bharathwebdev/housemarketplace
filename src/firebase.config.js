// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2NREiTDipxfC3peLEsdhuCP7kmZHiYeY",
  authDomain: "house-marketplace-app-6534c.firebaseapp.com",
  projectId: "house-marketplace-app-6534c",
  storageBucket: "house-marketplace-app-6534c.appspot.com",
  messagingSenderId: "407183845386",
  appId: "1:407183845386:web:3e38e16a3270f99968d7f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db  = getFirestore();