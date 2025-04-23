// auth.js

// Initialize Firebase (make sure firebase-config.js is loaded first)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const messageDiv = document.getElementById('message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function signup() {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Redirect to your main dashboard
      window.location.href = 'adspy.html';
    })
    .catch(err => {
      messageDiv.textContent = err.message;
    });
}

function login() {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Redirect to your main dashboard
      window.location.href = 'adspy.html';
    })
    .catch(err => {
      messageDiv.textContent = 'Login failed: ' + err.message;
    });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      // Redirect to your main dashboard
      window.location.href = 'adspy.html';
    })
    .catch(err => {
      messageDiv.textContent = 'Google login failed: ' + err.message;
    });
}
