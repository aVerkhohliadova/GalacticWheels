import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // setPersistence,
  // browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../firebase.config";

export async function signUp(email, password) {
  try {
    // await setPersistence(auth, browserLocalPersistence);
    return (await createUserWithEmailAndPassword(auth, email, password)).user;
  } catch (error) {
    throw error.message;
  }
}

export async function login(email, password) {
  try {
    // TODO: Fix, not currently working
    // await setPersistence(auth, browserLocalPersistence);
    return (await signInWithEmailAndPassword(auth, email, password)).user;
  } catch (error) {
    throw error.message;
  }
}

export async function logout() {
  try {
    return await auth.signOut();
  } catch (error) {
    throw error.message;
  }
}

export async function getUser() {
  try {
    return auth.currentUser;
  } catch (error) {
    throw error.message;
  }
}
