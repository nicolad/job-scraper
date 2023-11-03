import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

import { enrich } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const names = await kv.keys("*");
  const jobs = await Promise.all(
    names.map(async (name) => {
      const itemData = await kv.hgetall(name);
      return itemData!;
    })
  );

  jobs?.forEach(async (item: any) => {
    const url = item?.url;
    const enrichedData = await enrich(url);

    try {
      kv.hset(url, {
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
