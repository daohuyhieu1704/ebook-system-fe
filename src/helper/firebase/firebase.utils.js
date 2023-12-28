import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUSyxH0hfuRWIZoyA29NQAHUtiPUhKZ5Y",
  authDomain: "sbox-44ea2.firebaseapp.com",
  projectId: "sbox-44ea2",
  storageBucket: "sbox-44ea2.appspot.com",
  messagingSenderId: "699014723641",
  appId: "1:699014723641:web:c3a1c458f19743e37475e8",
  measurementId: "G-3H17M2G723",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
