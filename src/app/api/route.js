import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0; //revalidate api every 0 second
//https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no

import { createIndexAPI } from "./domain";

export async function GET() {
  await createIndexAPI();
  const res = { job: "done" };
  return NextResponse.json(res);
}
