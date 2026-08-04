import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyd0vgZ-IKKh0MtLj5E8mvk9y9NjuqTkU",
  authDomain: "remindly-1c1bc.firebaseapp.com",
  projectId: "remindly-1c1bc",
  storageBucket: "remindly-1c1bc.firebasestorage.app",
  messagingSenderId: "221365267767",
  appId: "1:221365267767:web:8f33c7c1c78010cce63eb2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
