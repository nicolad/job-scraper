import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

import { enrich } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await kv.lrange("jobs", 0, 1000);

  jobs?.forEach(async (item: any) => {
    const url = item?.url;
    const enrichedData = await enrich(url);

    try {
      kv.set("jobs", {
        url,
        ...enrichedData,
      });
    } catch (error) {
      console.error(
        `An error occurred while inserting records into jobs: ${error}`
      );
    }
  });

  return NextResponse.json(null);
}
