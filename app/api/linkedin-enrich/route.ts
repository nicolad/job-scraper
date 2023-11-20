import { NextResponse, NextRequest } from "next/server";
import { JSONPreset } from "lowdb/node";
import axios from "axios";
import { load } from "cheerio";

export const dynamic = "force-dynamic";

export async function GET(req: Request | NextRequest) {
  const jobsDb = await JSONPreset<any>("jobs.json", []);
  let jobs = jobsDb?.data;

  for (let index = 0; index < jobs.length; index++) {
    const { data } = await axios.get(jobs[index].url);
    const $ = load(data);

    const jobTitleSelector = ".topcard__title";
    const jobTitleSelector2 = ".top-card-layout__title";

    const descriptionSelector = ".description__text--rich";

    const jobTitle = $(jobTitleSelector).text().trim();
    const jobTitle2 = $(jobTitleSelector2).text().trim();
    const jobDescription = $(descriptionSelector).text().trim();

    console.log(jobTitle, jobDescription);

    jobs[index] = {
      ...jobs[index],
      title: jobTitle || jobTitle2,
      description: jobDescription,
    };
  }

  jobsDb.write();

  return NextResponse.json(null);
}
