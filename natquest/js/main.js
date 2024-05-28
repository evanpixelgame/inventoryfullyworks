import customEmitter from './scenes/utils/globalUtils/emitter.js';
import './scenes/utils/globalUtils/firebase.js';
import './game.js';
//test

import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase.js';

// Get elements
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authMessage = document.getElementById('auth-message');

// Event listeners for buttons
registerBtn.addEventListener('click', () => {
    console.log('regist btn clicked');
    const email = emailInput.value;
    const password = passwordInput.value;
    registerUser(email, password);
});

loginBtn.addEventListener('click', () => {
    console.log('login btn clicked');
    const email = emailInput.value;
    const password = passwordInput.value;
    loginUser(email, password);
});



// Firebase functions
async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
    } catch (error) {
        console.error('Error logging in user:', error);
    }
}

async function saveData(userId, data) {
    try {
        await setDoc(doc(db, 'users', userId), data);
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

async function loadData(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// You can now use customEmitter and Firebase functions within your game scenes or wherever needed
