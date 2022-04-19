// < !--The core Firebase JS SDK is always required and must be listed first-- >

// import firebase from 'firebase/app';
import firebase from 'firebase/app';
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import "firebase/firebase-analytics";
import "firebase/firebase-storage";

require("firebase/firestore");
import key from "../key.txt";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: key[0].key,
    authDomain: "feedback-form-4c8fb.firebaseapp.com",
    projectId: "feedback-form-4c8fb",
    storageBucket: "feedback-form-4c8fb.appspot.com",
    messagingSenderId: "1012912839173",
    appId: "1:1012912839173:web:3c56c0e719ec7d85871a6c",
    measurementId: "G-JHSGGGQZ98"
};

// Initialize Firebase
const fbase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fbase, db };

// firebase.analytics();