import { NextResponse } from "next/server";
import { JSONPreset } from "lowdb/node";

import { checkLatestJobs } from "@/utils";
import { getCompanies } from "@/app/actions";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await JSONPreset<any>("db.json", []);
  const companies = await getCompanies();

  companies?.forEach(async (item: any) => {
    const latestJobs = await checkLatestJobs(item);
    latestJobs?.forEach(async (je: any) => {
      //console.log("url: ", db?.data);
      if (db?.data?.find((item: any) => item?.url === je?.url)) return;

      db?.data?.push(je);
    });

    db.write();
  });

  return NextResponse.json(null);
}
