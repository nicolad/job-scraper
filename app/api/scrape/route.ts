import { NextResponse } from "next/server";
import { JSONPreset } from "lowdb/node";

import { checkLatestJobs } from "@/utils";
import { getCompanies } from "@/app/actions";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await JSONPreset<any>("db.json", []);
  const companies = await getCompanies();

  companies?.forEach(async (item: any) => {
    const companyURL = item?.jobListingURL ?? item?.website_url;
    const latestJobs = await checkLatestJobs(companyURL);
    latestJobs?.forEach(async (url: any) => {
      console.log("url: ", db?.data);
      if (db?.data?.find((item: any) => item?.url === url)) return;

      db?.data?.push({
        url,
      });
    });

    db.write();
  });

  return NextResponse.json(null);
}
