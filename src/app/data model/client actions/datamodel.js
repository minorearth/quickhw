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

import { app } from "./firebaseapp";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// const RESEND_API_KEY = "re_FmyuB8GY_H8Gko2QyVL7XCqDhMvzfpfMn";

// export async function POST(email) {
//   const res = await fetch("https://api.resend.com/emails", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${RESEND_API_KEY}`,
//     },
//     body: JSON.stringify({
//       from: "Acme <onboarding@resend.dev>",
//       to: [email],
//       subject: "hello world",
//       html: "<strong>it works!</strong>",
//     }),
//   });

//   if (res.ok) {
//     const data = await res.json();
//     return Response.json(data);
//   }
// }

export async function sendmail(email) {
  POST();
}

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
