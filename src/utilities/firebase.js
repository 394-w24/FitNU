// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX309Qm4ldvUFxWjj4fKhgy3dLUvbIZaQ",
  authDomain: "fitnu-305a3.firebaseapp.com",
  databaseURL: "https://fitnu-305a3-default-rtdb.firebaseio.com",
  projectId: "fitnu-305a3",
  storageBucket: "fitnu-305a3.appspot.com",
  messagingSenderId: "1078061988604",
  appId: "1:1078061988604:web:3a16eedfd6f474837ab579",
  measurementId: "G-FV5B15CE6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);