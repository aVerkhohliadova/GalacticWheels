import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { Spaceship, User } from "../DB";

export const COLLECTION = {
  USERS: "users",
  SPACESHIPS: "spaceships",
};

export async function add(coll, data) {
  try {
    return (await addDoc(collection(db, coll), data)).id;
  } catch (e) {
    throw e.message;
  }
}

export async function addWithId(coll, id, data) {
  try {
    const docRef = doc(collection(db, coll), id);
    return await setDoc(docRef, data);
  } catch (e) {
    throw e.message;
  }
}

export async function getAll(coll) {
  try {
    const data = await getDocs(collection(db, coll));
    return data.docs.map((doc) => {
      if (coll === COLLECTION.USERS) {
        return new User({
          id: doc.id,
          ...doc.data(),
        });
      }

      if (coll === COLLECTION.SPACESHIPS) {
        return new Spaceship({
          id: doc.id,
          ...doc.data(),
        });
      }

      throw Error("Unknown collection found!");
    });
  } catch (e) {
    throw e.message;
  }
}

export async function update(coll, id, data) {
  try {
    return await updateDoc(doc(db, coll, id), data);
  } catch (e) {
    throw e.message;
  }
}

export async function remove(coll, id) {
  try {
    return await deleteDoc(doc(db, coll, id));
  } catch (e) {
    throw e.message;
  }
}

export async function get(coll, id) {
  try {
    return (await getDoc(doc(db, coll, id))).data();
  } catch (e) {
    throw e.message;
  }
}
