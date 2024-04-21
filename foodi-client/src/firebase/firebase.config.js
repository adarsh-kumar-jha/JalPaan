// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFCZTg5CzFmEliF8Hd4q3iYDytyj42wZI",
  authDomain: "foodi-client-part5-f1774.firebaseapp.com",
  projectId: "foodi-client-part5-f1774",
  storageBucket: "foodi-client-part5-f1774.appspot.com",
  messagingSenderId: "833310483194",
  appId: "1:833310483194:web:a8e513b121141629485f43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;