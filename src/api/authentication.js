import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../firebase.config";

export async function signUp(email, password) {
  try {
    return (await createUserWithEmailAndPassword(auth, email, password)).user;
  } catch (error) {
    console.error("Error whole signing up user: ", error.message);
    return null;
  }
}

export async function login(email, password) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    return (await signInWithEmailAndPassword(auth, email, password)).user;
  } catch (error) {
    console.error("Error while logging user in: ", error.message);
    return null;
  }
}

export async function logout() {
  try {
    return await auth.signOut();
  } catch (error) {
    console.error("Error while logging user in: ", error.message);
    return null;
  }
}

export async function getUser() {
  try {
    return auth.currentUser;
  } catch (error) {
    console.error("Error while getting logged-in user: ", error.message);
    return null;
  }
}
