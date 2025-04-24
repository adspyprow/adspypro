// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './firebase-config';

// Sign up
document.getElementById('signup-btn').addEventListener('click', () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful signup, redirect to adspy.html
      window.location.href = "adspy.html";
    })
    .catch((error) => {
      console.error(error.message);
      alert('Signup failed. Please try again.');
    });
});

// Login
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful login, redirect to adspy.html
      window.location.href = "adspy.html";
    })
    .catch((error) => {
      console.error(error.message);
      alert('Login failed. Please try again.');
    });
});

// Google login
const provider = new GoogleAuthProvider();
document.getElementById('google-login').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Successful Google login, redirect to adspy.html
      window.location.href = "adspy.html";
    })
    .catch((error) => {
      console.error(error.message);
      alert('Google login failed. Please try again.');
    });
});
