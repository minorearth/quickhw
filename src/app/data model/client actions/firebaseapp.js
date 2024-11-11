import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_API_KEY,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID,
  // apiKey: "AIzaSyDIAQFmj3zL1Qs_drUehhaKKMy9eZz27ew",
  // authDomain: "getitquick-79ca5.firebaseapp.com",
  // projectId: "getitquick-79ca5",
  // storageBucket: "getitquick-79ca5.appspot.com",
  // messagingSenderId: "831585919557",
  // appId: "1:831585919557:web:e454e5433fd6aae123f92c",
};

export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const storage = getStorage(app);
export const auth = getAuth(app);
