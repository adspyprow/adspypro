// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQmb2oFPkP_t_nWbA6s7ae4bpE9-1oqFw",
  authDomain: "adspypro-4ba71.firebaseapp.com",
  projectId: "adspypro-4ba71",
  storageBucket: "adspypro-4ba71.firebasestorage.app",
  messagingSenderId: "474193682492",
  appId: "1:474193682492:web:ede50cac047755a7eba339",
  measurementId: "G-W8GTLV1Z8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
