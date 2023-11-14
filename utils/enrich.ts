import _ from "lodash";
import { load } from "cheerio";
import axios from "axios";
import { JSONPreset } from "lowdb/node";

export const getJobSectionContent = (html: string, jobTitleSelector?: string, jobDescriptionSelector?: string): any => {
  const $ = load(html, { scriptingEnabled: true });
  let jd = {};
  if (jobTitleSelector !== undefined && jobTitleSelector !== null && jobTitleSelector !== "") {
    const jobTitleEl = $(jobTitleSelector);
    const jobTitleContent = jobTitleEl.text();
    jd = { ...jd, title: jobTitleContent };
  }
  if (jobDescriptionSelector !== undefined && jobDescriptionSelector !== null && jobDescriptionSelector !== "") {
    const jobDescEl = $(jobDescriptionSelector);
    const jobDescription = jobDescEl.text();
    jd = { ...jd, content: jobDescription };
  }
  return jd;
};

const fetchDetailsFromRecord = async (url: string, jobTitleSelector?: string, jobDescriptionSelector?: string) => {
  return axios.get(url).then((response) => {
    const html = response.data;
    return getJobSectionContent(html, jobTitleSelector, jobDescriptionSelector);
  });
};

export const enrich = async (jd: any, company: any): Promise<any> => {
  const details = await fetchDetailsFromRecord(jd?.url, company?.jobTitleSelector, company?.jobDescriptionSelector);
  if (!details) return null;

  return details;
};
