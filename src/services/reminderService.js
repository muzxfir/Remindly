import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function addReminder(uid, reminder) {
  await addDoc(collection(db, "reminders"), {
    uid,
    ...reminder,
    completed: false,
    createdAt: serverTimestamp(),
  });
}
