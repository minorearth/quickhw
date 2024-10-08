import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIAQFmj3zL1Qs_drUehhaKKMy9eZz27ew",
  authDomain: "getitquick-79ca5.firebaseapp.com",
  projectId: "getitquick-79ca5",
  storageBucket: "getitquick-79ca5.appspot.com",
  messagingSenderId: "831585919557",
  appId: "1:831585919557:web:e454e5433fd6aae123f92c",
};

export const app2 = initializeApp(firebaseConfig, "another");
