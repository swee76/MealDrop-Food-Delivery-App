import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getApp , getApps} from "firebase/app";
import { getStorage } from "firebase/storage";
// import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyDjJB5myL0JKZMEeZ6m66VGX1lYsJvvax0",
    authDomain: "mealdrop-8e339.firebaseapp.com",
    databaseURL: "https://mealdrop-8e339-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mealdrop-8e339",
    storageBucket: "mealdrop-8e339.appspot.com",
    messagingSenderId: "856842193051",
    appId: "1:856842193051:web:deb57cb9e72cea8e1e1e3e",
    measurementId: "G-5DPLMV3MXT"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
// Create a Firebase storage reference for food item images
// const storageRef = firebase.storage().ref('food-items');
