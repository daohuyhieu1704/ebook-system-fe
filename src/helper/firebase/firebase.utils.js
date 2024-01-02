import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs6pWDTpkMhtHNS0p8loqqHORFOF4RuMw",
  authDomain: "slide-kit.firebaseapp.com",
  projectId: "slide-kit",
  storageBucket: "slide-kit.appspot.com",
  messagingSenderId: "140218076230",
  appId: "1:140218076230:web:299814bd64320ab4d04e47",
  measurementId: "G-CEVVB6H7TD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
