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

import {
  getAuth,
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { signInTeacher } from "../server actions/session";
import { sendEmailVerification } from "firebase/auth";

import { app } from "./firebaseapp";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const sendEmailandVerify = () => {
  // const auth = getAuth();
  //   // Email verification sent!
  //   // ...
  // });
};

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
