import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD0FRbVMmSwmDCvO3MCv6ChAZ1VLlbRgY",
  authDomain: "twitter-clone-32d1c.firebaseapp.com",
  projectId: "twitter-clone-32d1c",
  storageBucket: "twitter-clone-32d1c.appspot.com",
  messagingSenderId: "573709615942",
  appId: "1:573709615942:web:57ce79cb005dce61e45b47",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
