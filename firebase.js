import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// import firebase from "firebase/compat";


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

export const auth = getAuth(app);

// Create a Firebase storage reference for food item images
// const storageRef = firebase.storage().ref('food-items');