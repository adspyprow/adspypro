// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDQmb2oFPkP_t_nWbA6s7ae4bpE9-1oqFw",
  authDomain: "adspypro-4ba71.firebaseapp.com",
  projectId: "adspypro-4ba71",
  storageBucket: "adspypro-4ba71.appspot.com",
  messagingSenderId: "474193682492",
  appId: "1:474193682492:web:ede50cac047755a7eba339",
  measurementId: "G-W8GTLV1Z8Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      document.getElementById("message").textContent = error.message;
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      document.getElementById("message").textContent = "Login failed: " + error.message;
    });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      document.getElementById("message").textContent = "Google login failed: " + error.message;
    });
}
