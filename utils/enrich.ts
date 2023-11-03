import _ from "lodash";
import { load } from "cheerio";
import axios from "axios";

export const getJobSectionContent = (html: string, url: string): any => {
  const $ = load(html, { scriptingEnabled: true });
  const siteURL = new URL(url);

  if (siteURL.hostname.includes("gravitasgroup")) {
    const jobSection = $("#job");
    const jobContent = jobSection.text();

    return jobContent.trim();
  }

  if (siteURL.hostname.includes("efinancialcareers")) {
    return "";
    const jobTitle = $(".job-info-data");
    const jobTitleContent = jobTitle.text();
    const jobSection = $(".job-description");
    const jobContent = jobSection.text();

    return jobTitleContent.trim() + jobContent.trim();
  }

  if (siteURL.hostname.includes("xpertise-recruitment")) {
    const jobSection = $(".job-page-flex");
    const jobTitle = $(".gen-title");
    const jobTitleContent = jobTitle.text();
    const jobContent = jobSection.text();

    return {
      content: jobContent.trim(),
      title: jobTitleContent.trim(),
    };
  }

  return "";
};

const fetchDetailsFromRecord = async (url: any, selector?: string) => {
  return axios.get(url).then((response) => {
    const html = response.data;
    const text = getJobSectionContent(html, url);
    return text;
  });
};

export const enrich = async (url: string): Promise<any> => {
  const details = await fetchDetailsFromRecord(url);
  if (!details) return null;

  return details;
};
