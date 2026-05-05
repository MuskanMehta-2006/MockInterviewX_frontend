import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh5oKTnjY2e-rLF9NUICOVIeP5NitJM6w",
  authDomain: "mockinterviewx-89546.firebaseapp.com",
  projectId: "mockinterviewx-89546",
  storageBucket: "mockinterviewx-89546.firebasestorage.app",
  messagingSenderId: "965971773054",
  appId: "1:965971773054:web:fa166dc0ed41f77f92ba2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Google Provider (FORCES ACCOUNT SELECT EVERY TIME)
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});