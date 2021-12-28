import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoBUmORUoBIjMj6B8yA3YiRNb0MP1hf-Q",
    authDomain: "diplomna-8f952.firebaseapp.com",
    projectId: "diplomna-8f952",
    storageBucket: "diplomna-8f952.appspot.com",
    messagingSenderId: "253639522522",
    appId: "1:253639522522:web:d1dc8b459f61c1ecd8cde3",
    measurementId: "G-J4YXQ37WQF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
// const analytics = getAnalytics(app);

// export default storage;
export {
    storage, firebase as default
}