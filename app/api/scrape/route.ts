import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { JSONPreset } from "lowdb/node";

import { checkLatestJobs, insertUniqueRecords } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await JSONPreset<any>("db.json", []);

  const file = await fs.readFile(
    process.cwd() + "/app/data/companies.json",
    "utf8"
  );
  const companies = JSON.parse(file)?.filter((company: any) => {
    return Boolean(company?.jobListingURL);
  });

  companies?.forEach(async (item: any) => {
    const companyURL = item?.jobListingURL ?? item?.website_url;
    const url = new URL(companyURL);
    const domainParts = url.hostname.split(".");
    const latestJobs = await checkLatestJobs(companyURL);

    latestJobs?.forEach(async (url: any) => {
      db.data.push({
        url,
      });
    });

    db.write();

    // await insertUniqueRecords(docs, "jobs", "url");
  });

  return NextResponse.json(null);
}
