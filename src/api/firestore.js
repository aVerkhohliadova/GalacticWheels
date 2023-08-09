import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { Spaceship, User } from "../DB";

export async function add(collection, data) {
  try {
    return (await addDoc(collection(db, collection), data)).id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

export async function getAll(coll) {
  try {
    return (await getDocs(collection(db, coll))).map((doc) => {
      if (coll === "users") {
        return new User({
          id: doc.id,
          ...doc.data(),
        });
      }

      if (coll === "spaceships") {
        return new Spaceship({
          id: doc.id,
          ...doc.data(),
        });
      }

      throw Error("Unknown collection found: ", coll);
    });
  } catch (e) {
    console.error("Error getting docs: ", e);
    return null;
  }
}

export async function update(coll, id, data) {
  try {
    return await updateDoc(doc(db, coll, id), data);
  } catch (e) {
    console.error("Error setting docs: ", e);
    return null;
  }
}

export async function remove(coll, id) {
  try {
    return await deleteDoc(doc(db, coll, id));
  } catch (e) {
    console.error("Error setting docs: ", e);
    return null;
  }
}

export async function get(coll, id) {
  try {
    return await getDoc(doc(db, coll, id));
  } catch (e) {
    console.error("Error setting docs: ", e);
    return null;
  }
}
