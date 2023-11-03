import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

import { enrich } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await kv.lrange("jobs", 0, 1000);

  jobs?.forEach(async (item: any) => {
    const enrichedData = await enrich(item?.url);
    console.log("enrichedData: ", enrichedData);
    // kv.hset("jobs", item?.url, enrichedData);
    // await insertUniqueRecords(docs, "jobs", "url");
  });

  return NextResponse.json(null);
}
