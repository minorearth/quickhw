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

import { app } from "./firebaseapp";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const getDocFromCollectionByIdRealtime = async (
  collectionName,
  id,
  refreshdata
) => {
  const docRef = doc(db, collectionName, id);
  const unsubscribe = onSnapshot(docRef, (doc) => {
    refreshdata(doc.data());
  });
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return { data: { id: docSnap.id, ...data }, unsubscribe };
};

export const addDocInCollection2 = async (collectionName, data) => {
  const doc = await addDoc(collection(db, collectionName), data);
  return doc.id;
};

export const setDocInCollection = async (collectionName, data, id) => {
  const newdoc = await setDoc(doc(db, collectionName, id), data);
  return newdoc.id;
};