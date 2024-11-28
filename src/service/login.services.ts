import { auth, errorHandler } from "@/config/firebase.config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const loginAPI = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
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
};

export { loginAPI, logout };
