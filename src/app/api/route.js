import { NextResponse } from "next/server";
import { addDocInCollection } from "../../datamodel";

export async function GET() {
  const today = new Date(2011, 10, 30, 12, 1, 1);
  const data = { title: "Новый опрос16", datetime: today, user: "Попкин3" };
  addDocInCollection("surveys", { ...data });
  return NextResponse.json({ fuck: "hello" });
}
