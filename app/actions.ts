"use server";
import { promises as fs } from "fs";
import { JSONPreset } from "lowdb/node";

export async function getCompanies() {
  const file = await fs.readFile(
    process.cwd() + "/app/data/companies.json",
    "utf8"
  );

  const companies = JSON.parse(file)?.filter((company: any) => {
    return Boolean(company?.jobListingURL);
  });

  return companies;
}

export async function deleteEntity(id: string) {
  const db = await JSONPreset<any>("db.json", []);
  console.log("db", id);
  db.data.forEach((item: any, index: number) => {
    if (item.url === id) {
      db.data.splice(index, 1);
    }
  });

  db.write();
}

export async function hideEntity(id: string) {
  const db = await JSONPreset<any>("db.json", []);
  console.log("db", id);
  db.data.forEach((item: any, index: number) => {
    if (item.url === id) {
      db.data[index].hide = true;
    }
  });

  db.write();
}
