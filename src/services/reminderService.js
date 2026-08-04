import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export async function addReminder(reminder) {
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  await addDoc(
    collection(db, "users", user.uid, "reminders"),
    {
      ...reminder,
      completed: false,
      createdAt: serverTimestamp(),
    }
  );
}
