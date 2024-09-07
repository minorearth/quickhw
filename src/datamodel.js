"use client";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  addDoc,
  deleteDoc,
  getFirestore,
  documentId,
  getDoc,
  updateDoc,
  writeBatch,
  getAll,
  initializeFirestore,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwMnO7HaGuHu6LrzsTj6y6J9BojyC1ei0",
  authDomain: "testchallenge-52d1b.firebaseapp.com",
  projectId: "testchallenge-52d1b",
  storageBucket: "testchallenge-52d1b.appspot.com",
  messagingSenderId: "785621858975",
  appId: "1:785621858975:web:e1fcef81ff499466bd40aa",
  measurementId: "G-E08Z0JNFH2",
};

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const getDocFromCollectionByIdRealtime = async (
  collectionName,
  id,
  Refresh
) => {
  const docRef = doc(db, collectionName, id);
  onSnapshot(docRef, (doc) => {
    Refresh(doc.data());
  });

  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return { id: docSnap.id, ...data };
};

// export const addDocInCollection = async (collectionName, data) => {
//   const doc = await addDoc(collection(db, collectionName), data);
//   return doc.id;
// };

export const log = async (data) => {
  await updateDoc(doc(db, "logs", "1"), data);
};
