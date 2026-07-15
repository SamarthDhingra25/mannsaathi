import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7UnwUYidprbc5GWC4V5yU9sE43DGOYDQ",
  authDomain: "mansaathi-85d0b.firebaseapp.com",
  projectId: "mansaathi-85d0b",
  storageBucket: "mansaathi-85d0b.firebasestorage.app",
  messagingSenderId: "501557869778",
  appId: "1:501557869778:web:687de4c580b27d051b410b",
  measurementId: "G-YE554D9BH3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;