// Import the functions you need (Firebase v9 modular)
import { initializeApp } from "firebase/app";
"https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "firebase/app";
"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBT8YAZqJWWyw1h3wpH4k5o0ttfAsvLCt4",
  authDomain: "decrypto-italiano-multiplayer.firebaseapp.com",
  projectId: "decrypto-italiano-multiplayer",
  storageBucket: "decrypto-italiano-multiplayer.firebasestorage.app",
  messagingSenderId: "595214334413",
  appId: "1:595214334413:web:9444255dcf69a339516c84"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
