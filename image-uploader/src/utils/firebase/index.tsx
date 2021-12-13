import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREABASE_API_KEY,
  authDomain: "devchallenges-2b252.firebaseapp.com",
  projectId: "devchallenges-2b252",
  storageBucket: "devchallenges-2b252.appspot.com",
  messagingSenderId: "134544993533",
  appId: "1:134544993533:web:63463634ab79748d95a294",
  measurementId: "G-C3PJ2SCWGL",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(
  firebaseApp,
  "gs://devchallenges-2b252.appspot.com/"
);
