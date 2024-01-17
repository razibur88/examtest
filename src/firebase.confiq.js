// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRiFROPleJJ04HgYMyt29bak3SiLkif-Y",
  authDomain: "test-1b99c.firebaseapp.com",
  projectId: "test-1b99c",
  storageBucket: "test-1b99c.appspot.com",
  messagingSenderId: "305815444689",
  appId: "1:305815444689:web:dcea2d9bb3bc5432dc79f0",
  measurementId: "G-06107RDJM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig