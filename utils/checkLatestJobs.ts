import _ from "lodash";
import { load } from "cheerio";
import axios from "axios";
import { isEfinancialCareersLink, isLafosseCareersLink } from "./sites";

export const getAllLinks = (html: string, url?: string): string[] => {
  const $ = load(html, { scriptingEnabled: true });
  const uniqueJobLinks = new Set<string>();

  $("a").each((_i, elem) => {
    const href = $(elem).attr("href");
    if (href) {
      if (url?.includes("gravitasgroup") && href.startsWith("/job/")) {
        const mainLink = href.split("/")[1] + "/" + href.split("/")[2];

        const siteURL = new URL(url);

        uniqueJobLinks.add(siteURL.origin + "/" + mainLink);
      }

      if (
        href?.includes("xpertise-recruitment") &&
        href.includes("jobs/view")
      ) {
        uniqueJobLinks.add(href);
      }

      if (isEfinancialCareersLink(href) || isLafosseCareersLink(href)) {
        uniqueJobLinks.add(href);
      }
    }
  });

  return Array.from(uniqueJobLinks);
};

const fetchTextFromRecord = async (url: any, selector?: string) => {
  if (!url) return null;
  return axios.get(url).then((response) => {
    const html = response.data;
    const text = getAllLinks(html, url);

    if (response?.status !== 200) {
      console.log("response.status: ", response?.status);
      return [];
    }
    return text;
  });
};

export const checkLatestJobs = async (url: string): Promise<any> => {
  const text = await fetchTextFromRecord(url);

  return text;
};
