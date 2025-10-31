import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZqt1fNSRfMuiAT4ERAZTLyn3MMWAbU84",
  authDomain: "finalwebsitesubmissiong3.firebaseapp.com",
  projectId: "finalwebsitesubmissiong3",
  storageBucket: "finalwebsitesubmissiong3.firebasestorage.app",
  messagingSenderId: "867284640390",
  appId: "1:867284640390:web:3eb668885c5568a3462707",
  measurementId: "G-76YWYQJVX7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Sign Up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      document.getElementById('signupMessage').textContent = "Saved! Redirecting to login...";
      signupForm.reset();
      setTimeout(() => window.location.href = 'login.html', 1500);
    } catch (err) {
      document.getElementById('signupMessage').textContent = err.message;
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  // Auto-fill email/password if exists
  document.getElementById('loginEmail').value = localStorage.getItem('email') || '';
  document.getElementById('loginPassword').value = localStorage.getItem('password') || '';

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const firstName = localStorage.getItem('firstName') || "User";

      document.getElementById('loginMessage').textContent = `Welcome back, ${firstName}!`;
      loginForm.reset();
      setTimeout(() => window.location.href = 'index.html', 1500);
    } catch (err) {
      document.getElementById('loginMessage').textContent = err.message;
    }
  });
}

const card = document.createElement('div');
card.className = 'watch-card';
card.innerHTML = `
  <div class="card-image">
    <img src="${movie.poster_path}" alt="${movie.title}">
    <div class="card-buttons">
      <button class="play-btn">Play</button>
      <button class="add-btn">+</button>
    </div>
  </div>
  <div class="card-info">
    <p class="movie-name">${movie.title}</p>
    <p class="movie-date">${movie.release_date}</p>
  </div>
`;
document.querySelector('.watchlist-grid').appendChild(card);