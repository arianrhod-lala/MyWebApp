import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "GOOGLE_API_KEY",
    authDomain: "mywebapp-35ca8.firebaseapp.com",
    projectId: "mywebapp-35ca8",
    storageBucket: "mywebapp-35ca8.firebasestorage.app",
    messagingSenderId: "649230501769",
    appId: "1:649230501769:web:1a7f843ff97d11aeae4358"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Toggle between login and register forms on the landing page
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginToggle.addEventListener('click', () => {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
});

registerToggle.addEventListener('click', () => {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

// Register user
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Your account has been created successfully.',
            confirmButtonColor: '#4CAF50'
        });
        registerForm.reset();
        // Switch to login form after successful registration
        loginToggle.click();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.message,
            confirmButtonColor: '#4CAF50'
        });
    }
});

// Login user
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have been logged in successfully.',
            confirmButtonColor: '#4CAF50'
        });
        loginForm.reset();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.message,
            confirmButtonColor: '#4CAF50'
        });
    }
});