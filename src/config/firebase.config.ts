import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { logout } from "@/service/login.services";
import { showCustomToast } from "@utils/customToast";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDPX6dVqwqb1IS2l58R_IASXKwFXRNNUjg",
  authDomain: "my-music-web-ce403.firebaseapp.com",
  projectId: "my-music-web-ce403",
  storageBucket: "my-music-web-ce403.firebasestorage.app",
  messagingSenderId: "86466988611",
  appId: "1:86466988611:web:1b3ef9c49a158467eea2f6",
  measurementId: "G-XWJKJB7FKR",
};

const app = initializeApp(firebaseConfig);

export const ipoCollectionName = "new_ipos";
export const userCollectionName = "users";

export const auth = getAuth(app);

export const db = getFirestore(app);

export const errorHandler = (error: any) => {
  if (error.code === "permission-denied" || error.code === "unauthenticated") {
    console.log("Unauthorized. Logging out...");
    logout();
  }
  if (error.code === "auth/network-request-failed" || error.code === "network-request-failed") {
    showCustomToast("Check your Internet connection", "error");
  }
  throw new Error(error.message || "something went wrong");
};
