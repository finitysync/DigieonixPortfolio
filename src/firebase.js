import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9KzNr-T3cqPIlmH90pKUXpPKhW0gQ288",
  authDomain: "digieonix-website.firebaseapp.com",
  projectId: "digieonix-website",
  storageBucket: "digieonix-website.firebasestorage.app",
  messagingSenderId: "437495495183",
  appId: "1:437495495183:web:ff31834cc96d91f1c5017a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
