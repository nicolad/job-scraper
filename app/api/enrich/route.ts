import { NextResponse } from "next/server";
import { JSONPreset } from "lowdb/node";

import { enrich } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await JSONPreset<any>("db.json", []);
  let jobs = db?.data;

  console.log("start");
  for (let index = 0; index < jobs.length; index++) {
    const item = jobs[index];
    const url = item?.url;
    try {
      const enrichedData = await enrich(url);
      jobs[index] = { url: item?.url, ...enrichedData };
    } catch (error) {
      console.log("error", error);
    }
  }
  console.log("end");

  console.log("jobs", jobs);

  db.write();

  return NextResponse.json(null);
}
