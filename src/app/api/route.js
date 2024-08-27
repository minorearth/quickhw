import { NextResponse } from "next/server";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  initializeFirestore,
  Timestamp,
} from "firebase/firestore";

export const dynamic = "force-dynamic";
export const revalidate = 0; //revalidate api every 1 second
// https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no

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
  useFetchStreams: true,
});

const deleteAllDocsInCollection = async (collectionName, timeLag) => {
  let th = new Date(2024, 8, 30, 12, 1, 2);
  th.setDate(th.getDate() - timeLag);
  const thresold = Timestamp.fromDate(th);
  const col = collection(db, collectionName);
  // const q = query(col, where("datetime", "<=", thresold));
  // const docs = await getDocs(q);
  const docs = await getDocs(col);
  let log = { len: docs.docs.length, date: th.toString(), vers: "3" };
  docs.forEach(async (docS) => {
    // deleteAllFileFromDir(`/capture/${docS.id}`);
    log = { ...log, [docS.id]: docS.id };

    deleteDoc(doc(db, collectionName, docS.id));
  });
  return log;
};

export async function GET() {
  // const today = new Date(2011, 10, 30, 12, 1, 2);
  // const data = { title: "Новый опрос16", datetime: today, user: "Попкин3" };
  // addDocInCollection("surveys", { ...data });
  const res = await deleteAllDocsInCollection("surveys", -10);
  return NextResponse.json(res);
}
