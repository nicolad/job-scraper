import { NextResponse, NextRequest } from "next/server";
import { getCompanies } from "@/app/actions";
import { JSONPreset } from "lowdb/node";

export const dynamic = "force-dynamic";

import { chromium } from "playwright";

export async function GET(req: Request | NextRequest) {
  const companies = await getCompanies();
  const jobs = await JSONPreset<any>("jobs.json", []);

  companies?.forEach(async (item) => {
    if (item?.linkedinJobsURL) {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(item?.linkedinJobsURL);

      const links = await page.$$eval("a", (anchors) =>
        anchors.map((anchor) => anchor.href)
      );

      const filteredLinks = links?.filter((link) =>
        link.includes("linkedin.com/jobs/view")
      );

      for (const jobEntry of filteredLinks) {
        const exists = jobs.data.find((item: any) => item.url === jobEntry);
        if (!exists) {
          jobs.data.push({
            url: jobEntry,
            company: item?.name,
          });
        }
      }

      jobs.write();

      await browser.close();
    }
  });

  return NextResponse.json(null);
}
