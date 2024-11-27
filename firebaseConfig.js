import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiVzNzhLmA8wHo3i0qHkvvJj-WlWq-dAs",
  authDomain: "mathapp-1f7b3.firebaseapp.com",
  projectId: "mathapp-1f7b3",
  storageBucket: "mathapp-1f7b3.firebasestorage.app",
  messagingSenderId: "679610191463",
  appId: "1:679610191463:web:63fb845bddb59527ff8ec2",
  measurementId: "G-TKJ87728HS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };