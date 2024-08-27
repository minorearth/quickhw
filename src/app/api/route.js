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

// const firebaseConfig = {
//   apiKey: "AIzaSyBwMnO7HaGuHu6LrzsTj6y6J9BojyC1ei0",
//   authDomain: "testchallenge-52d1b.firebaseapp.com",
//   projectId: "testchallenge-52d1b",
//   storageBucket: "testchallenge-52d1b.appspot.com",
//   messagingSenderId: "785621858975",
//   appId: "1:785621858975:web:e1fcef81ff499466bd40aa",
//   measurementId: "G-E08Z0JNFH2",
// };

// import { initializeApp } from "firebase/app";
import { deleteAllDocsInCollection } from "../../datamodelSSR";

// const app = initializeApp(firebaseConfig);

// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });

export async function GET() {
  const res = await deleteAllDocsInCollection("surveys", -10);
  return NextResponse.json(res);
}
