import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
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

export async function getReminders() {
  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    collection(db, "users", user.uid, "reminders"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
