import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIMuEDevXsMH_qJBVBfqJFW78x_GcB6W4",
  authDomain: "mytodolist-23f14.firebaseapp.com",
  projectId: "mytodolist-23f14",
  storageBucket: "mytodolist-23f14.appspot.com",
  messagingSenderId: "1001711431618",
  appId: "1:1001711431618:web:f072fa9b991eb24e6bb05b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}