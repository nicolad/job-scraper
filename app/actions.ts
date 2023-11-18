"use server";
import { companies } from "@/companies";
import { JSONPreset } from "lowdb/node";

/**
 * Companies that have job listing URL added
 */
export async function getCompanies() {
  return companies?.filter((company: any) => {
    return Boolean(company?.jobListingURL) || Boolean(company?.linkedinJobsURL);
  });
}

export async function deleteEntity(id: string) {
  const db = await JSONPreset<any>("jobs.json", []);
  db.data.forEach((item: any, index: number) => {
    if (item.url === id) {
      db.data.splice(index, 1);
    }
  });

  db.write();
}

export async function hideEntity(id: string) {
  const db = await JSONPreset<any>("jobs.json", []);
  console.log("db", id);
  db.data.forEach((item: any, index: number) => {
    if (item.url === id) {
      db.data[index].hide = true;
    }
  });

  db.write();
}
