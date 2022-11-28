// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPRzpTvuX1k1xN6zoJsKmye3XgiJaKlUo",
  authDomain: "keyword-274e2.firebaseapp.com",
  projectId: "keyword-274e2",
  storageBucket: "keyword-274e2.appspot.com",
  messagingSenderId: "674868820678",
  appId: "1:674868820678:web:1b2d1c1872c174b7ecf5c7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
