import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvyx4oNq_UFS-4IN3s72QRKkLkqCZ7kWo",
  authDomain: "inventory-afe92.firebaseapp.com",
  projectId: "inventory-afe92",
  storageBucket: "inventory-afe92.firebasestorage.app",
  messagingSenderId: "587376107774",
  appId: "1:587376107774:web:5d855d963feddd39bc85af",
  measurementId: "G-ZQ5Q4CP97X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);  // Pass 'app' to getAuth
const db = getFirestore(app);
const analytics = getAnalytics(app);  // Optional if you're not using analytics

// Export the initialized services
export { app, auth, db };
