// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmSDQ--5jxK7uO9iOFkX_ZrqfdBA0HwVY",
    authDomain: "email-password-atiqur.firebaseapp.com",
    projectId: "email-password-atiqur",
    storageBucket: "email-password-atiqur.firebasestorage.app",
    messagingSenderId: "78450456597",
    appId: "1:78450456597:web:450fd4f3c2bc89cc55361c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);