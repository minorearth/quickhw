import { NextResponse } from "next/server";
import { addDocInCollection } from "../../datamodel";
import { deleteAllDocsInCollection } from "../../datamodelSSR";

export async function GET() {
  // const today = new Date(2011, 10, 30, 12, 1, 2);
  // const data = { title: "Новый опрос16", datetime: today, user: "Попкин3" };
  // addDocInCollection("surveys", { ...data });
  deleteAllDocsInCollection("surveys", -1);
  return NextResponse.json({ fuck: "hello" });
}
