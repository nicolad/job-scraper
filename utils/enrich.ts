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
    jd = { ...jd, description: jobDescription };
  }
  return jd;
};

const fetchDetailsFromRecord = async (url: string, jobTitleSelector?: string, jobDescriptionSelector?: string) => {
  try {
    return await axios.get(url).then((response) => {
      const html = response.data;
      return getJobSectionContent(html, jobTitleSelector, jobDescriptionSelector);
    });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export const enrich = async (jd: any, company: any): Promise<any> => {
  const details = await fetchDetailsFromRecord(jd?.url, company?.jobTitleSelector, company?.jobDescriptionSelector);
  if (!details) return null;

  return details;
};
