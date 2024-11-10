import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0; //revalidate api every 0 second
//https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no

import { deleteAllDocsInCollection } from "./api";
import { createIndex } from "./api";

export async function GET() {
  // const res = await deleteAllDocsInCollection("surveys", 3);
  await createIndex();
  const res = { job: "done2" };
  console.log("API executed");
  return NextResponse.json(res);
}
