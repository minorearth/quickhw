import { NextResponse } from "next/server";
import { deleteAllDocsInCollection } from "../../datamodelSSR";

export async function GET() {
  const res = await deleteAllDocsInCollection("surveys", -10);
  return NextResponse.json(res);
}
