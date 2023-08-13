// eslint-disable-file camelcase
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { collection, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDY-apc2i_5uPkbnQ7SqiGFPDWjc5HkmIE",
  authDomain: "sample-51b08.firebaseapp.com",
  projectId: "sample-51b08",
  storageBucket: "sample-51b08.appspot.com",
  messagingSenderId: "739107815548",
  appId: "1:739107815548:web:bca3c5a0a34ec9f74109f9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadChain(spaceships) {
  if (!spaceships.length) {
    console.log("All Done!");
    return;
  }

  const s = spaceships.shift();

  const docRef = doc(collection(db, "spaceships"));
  s.rent_from = null;
  s.rent_to = null;
  s.id = docRef.id;

  await setDoc(docRef, s);
  console.log("Uploaded", s.title);

  uploadChain(spaceships);
}

// eslint-disable-next-line import/extensions
uploadChain(require("./spaceships.json"));
