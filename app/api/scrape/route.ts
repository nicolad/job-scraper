import { NextResponse, NextRequest } from "next/server";
import { JSONPreset } from "lowdb/node";

import { checkLatestJobs } from "@/utils";
import { getCompanies } from "@/app/actions";

export const dynamic = "force-dynamic";

export async function GET(req: Request | NextRequest) {
  const jobs = await JSONPreset<any>("jobs.json", []);
  const companies = await getCompanies();
  const url = new URL(req?.url ?? "", "http://localhost:3000");
  const company = url.searchParams.get("company");

  async function updateDatabaseWithLatestJobs(latestJobs: any[]) {
    for (const jobEntry of latestJobs) {
      const exists = jobs.data.find((item: any) => item.url === jobEntry.url);
      if (!exists) {
        jobs.data.push(jobEntry);
      }
    }
    await jobs.write();
  }

  if (company) {
    const companyData = companies?.find((item: any) =>
      item?.name.includes(company)
    );
    const latestJobs = await checkLatestJobs(companyData);
    updateDatabaseWithLatestJobs(latestJobs);

    return NextResponse.json(null);
  }

  companies?.forEach(async (item: any) => {
    const latestJobs = await checkLatestJobs(item);
    updateDatabaseWithLatestJobs(latestJobs);
  });

  return NextResponse.json(null);
}
