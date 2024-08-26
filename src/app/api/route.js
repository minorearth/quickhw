import { NextResponse } from "next/server";
import { addDocInCollection } from "../../datamodel";

export async function GET() {
  const today = new Date();
  const data = { title: "Новый опрос16", datetime: today, user: "Попкин2" };
  addDocInCollection("surveys", { ...data });
  return NextResponse.json({ fuck: "hello" });
}
