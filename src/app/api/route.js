import { NextResponse } from "next/server";
import { addDocInCollection } from "../../datamodel";
import { deleteAllDocsInCollection } from "../../datamodelSSR";

export const dynamic = "force-dynamic";
// https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no

export async function GET() {
  // const today = new Date(2011, 10, 30, 12, 1, 2);
  // const data = { title: "Новый опрос16", datetime: today, user: "Попкин3" };
  // addDocInCollection("surveys", { ...data });
  const res = deleteAllDocsInCollection("surveys", -10);
  return NextResponse.json(res);
}
