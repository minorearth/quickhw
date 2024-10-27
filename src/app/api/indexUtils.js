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

import { getAuth } from "firebase/auth";

import { setDocInCollection } from "../data model/client actions/datamodel";

import { app } from "../data model/client actions/firebaseapp";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

getAuth(app);

const INDEX_COL = "index";
const INDEXCURR_COL = "indexcurr";

//New user
export const createNewUser = async (userId) => {
  await setDocInCollection("surveys", { surveys: {} }, userId);
  await addIndexInCollection(userId);
  await addIndexCurrInCollection(userId);
};

const addIndexInCollection = async (userId) => {
  await setDoc(doc(db, INDEX_COL, userId + "_0"), {});
  return doc.id;
};

//New user
const addIndexCurrInCollection = async (userId) => {
  await setDoc(doc(db, INDEXCURR_COL, userId), { currindex: 0 });
  return doc.id;
};

//exceed error
export const increaseIndexCurrInCollection = async (userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  await updateDoc(doc(db, INDEXCURR_COL, userId), { currindex: ci + 1 });
  await setDoc(doc(db, INDEX_COL, userId + `_${ci + 1}`), {});
  return userId + `_${ci + 1}`;
};

export const getCurrIndexDocID = async (userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  const docSnap2 = await getDoc(doc(db, INDEX_COL, userId + `_${ci}`));
  return docSnap2.id;
};

export const getCurrIndex = async (userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  return ci;
};
