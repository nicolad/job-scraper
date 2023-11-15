import { NextResponse } from "next/server";
import { JSONPreset } from "lowdb/node";

import { enrich } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobsDb = await JSONPreset<any>("db.json", []);
  const companiesDb = await JSONPreset<any>("companies.json", []);
  let jobs = jobsDb?.data;

  for (let index = 0; index < jobs.length; index++) {
    const item = jobs[index];
    if (
      item.company === undefined ||
      item.company === null ||
      item.company === ""
    ) {
      continue;
    }

    //if (db?.data?.find((item: any) => item?.url === je?.url)) return;
    let company = companiesDb?.data?.find(
      (company: any) => company?.name === item.company
    );
    if (company !== undefined && company !== null) {
      const enrichedData = await enrich(item, company);
      jobs[index] = { ...item, ...enrichedData };
    }
  }

  jobsDb.write();

  return NextResponse.json(null);
}
