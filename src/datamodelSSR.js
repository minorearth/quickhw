"use server";
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
} from "firebase/firestore";

import { deleteAllFileFromDir } from "./storagedb";

// import { checkIfUniqueExistAndReturnDocDM } from "./dm";

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

export const deleteAllDocsInCollection = async (collectionName, timeLag) => {
  let thresold = new Date(2024, 8, 30, 12, 1, 2);
  thresold.setDate(thresold.getDate() - timeLag);
  const col = collection(db, collectionName);
  const q = query(col, where("datetime", "<=", thresold));
  const docs = await getDocs(q);
  return { len: docs.docs.length, date: thresold.toString() };
  // docs.forEach(async (docS) => {
  //   deleteAllFileFromDir(`/capture/${docS.id}`);
  //   deleteDoc(doc(db, collectionName, docS.id));

  //   // const item = doc.data();
  //   // const date = new Date(item.datetime.seconds * 1000);
  // });
};
