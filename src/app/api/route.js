import { NextResponse } from "next/server";
import { addDocInCollection } from "../../datamodel";
import { deleteAllDocsInCollection } from "../../datamodelSSR";

export async function GET() {
  // const today = new Date(2011, 10, 30, 12, 1, 2);
  // const data = { title: "Новый опрос16", datetime: today, user: "Попкин3" };
  // addDocInCollection("surveys", { ...data });
  const res = await deleteAllDocsInCollection("surveys", -10);
  return NextResponse.json(res);
}