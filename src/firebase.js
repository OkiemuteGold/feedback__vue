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
    authDomain: key[0].authDomain,
    projectId: key[0].projectId,
    storageBucket: key[0].storageBucket,
    messagingSenderId: key[0].messagingSenderId,
    appId: key[0].appId,
    measurementId: key[0].measurementId
};

// Initialize Firebase
const fbase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fbase, db };

// firebase.analytics();