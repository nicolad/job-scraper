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

      const filteredLinks = links
        ?.filter((link) => link.includes("linkedin.com/jobs/view"))
        .map((link) => link?.split("?")?.[0]);

      for (const jobEntry of filteredLinks) {
        // Normalize the URL by removing query parameters
        const normalizedURL = new URL(jobEntry);
        normalizedURL.search = ""; // Remove query parameters
        const jobBaseURL = normalizedURL.toString();
        const exists = jobs.data.some((job: any) =>
          job.url.startsWith(jobBaseURL)
        );

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
