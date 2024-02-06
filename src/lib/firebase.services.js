// sign up
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// login
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// verify email
import { sendEmailVerification } from "firebase/auth";

export const verifyEmail = (user) => {
  return sendEmailVerification(user);
};

// logout

export const logout = () => {
  return auth.signOut();
};

// get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// sign in with google

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// forgot password

export const forgotPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// sign with github

export const signInWithGithub = () => {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};
