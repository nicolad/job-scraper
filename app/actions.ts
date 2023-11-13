"use server";
import { JSONPreset } from "lowdb/node";

export async function getCompanies() {
  const db = await JSONPreset<any>("companies.json", []);

  const companies = db?.data?.filter((company: any) => {
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
