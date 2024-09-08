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
//https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no

import { deleteAllDocsInCollection } from "../db/datamodelSSR";

export async function GET() {
  const res = await deleteAllDocsInCollection("surveys", 3);
  return NextResponse.json(res);
}
