// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAhm8TOQ_4uvmu-6uLpRsoHLxWbBciK1I",
  authDomain: "texttiles-9aa6e.firebaseapp.com",
  projectId: "texttiles-9aa6e",
  storageBucket: "texttiles-9aa6e.appspot.com",
  messagingSenderId: "1058909976146",
  appId: "1:1058909976146:web:4c0a52874f51d5bd05d18b",
  measurementId: "G-9MY6RBRZSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);