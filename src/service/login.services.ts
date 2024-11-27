import { auth, errorHandler } from "@/config/firebase.config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const loginAPI = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in successfully:", userCredential.user);
  } catch (error: any) {
    console.error("Login failed:", error.code);
    errorHandler(error);
    throw new Error("Login failed");
  }
};

const logout = async () => {
  await signOut(auth);
  localStorage.clear();
  window.location.href = "/login";
  console.log("User logged out");
};

export { loginAPI, logout };
