// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjJB5myL0JKZMEeZ6m66VGX1lYsJvvax0",
    authDomain: "mealdrop-8e339.firebaseapp.com",
    projectId: "mealdrop-8e339",
    storageBucket: "mealdrop-8e339.appspot.com",
    messagingSenderId: "856842193051",
    appId: "1:856842193051:web:deb57cb9e72cea8e1e1e3e",
    measurementId: "G-5DPLMV3MXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);