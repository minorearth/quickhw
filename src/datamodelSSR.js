"use server";

import { deleteAllFileFromDir } from "./storagedb";

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
  Timestamp,
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

export const deleteAllDocsInCollection = async (collectionName, timeLag) => {
  let th = new Date();
  th.setDate(th.getDate() - timeLag);
  const thresold = Timestamp.fromDate(th);
  const col = collection(db, collectionName);
  const q = query(col, where("datetime", "<=", thresold));
  const docs = await getDocs(q);
  let log = { len: docs.docs.length, date: th.toString(), vers: "4" };
  await Promise.all(
    docs.docs.map(async (docS) => {
      deleteAllFileFromDir(`/capture/${docS.id}`);
      log = { ...log, [docS.id]: docS.id };
      await deleteDoc(doc(db, collectionName, docS.id));
    })
  );
  return log;
};
