import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY-apc2i_5uPkbnQ7SqiGFPDWjc5HkmIE",
  authDomain: "sample-51b08.firebaseapp.com",
  projectId: "sample-51b08",
  storageBucket: "sample-51b08.appspot.com",
  messagingSenderId: "739107815548",
  appId: "1:739107815548:web:bca3c5a0a34ec9f74109f9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// NOTE: auth and db are exclusively used in api/authentication and api/firestore
// Don't use anywhere else
export { auth, db };
