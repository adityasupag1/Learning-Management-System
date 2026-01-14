// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "lms-website-a8428.firebaseapp.com",
  projectId: "lms-website-a8428",
  storageBucket: "lms-website-a8428.firebasestorage.app",
  messagingSenderId: "375974417487",
  appId: "1:375974417487:web:2e6805b163d7ccc0b5c63a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth, provider} 