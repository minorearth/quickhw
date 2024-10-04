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
  onSnapshot,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { deleteAllFileFromDir } from "./apiStoragedb";
import { app } from "./firebaseapp";

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
