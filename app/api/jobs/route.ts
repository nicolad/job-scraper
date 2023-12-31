import { NextResponse } from "next/server";
import { JSONPreset } from "lowdb/node";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await JSONPreset<any>("jobs.json", []);

  return NextResponse.json(db.data);
}
