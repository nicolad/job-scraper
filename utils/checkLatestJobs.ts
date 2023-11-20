import _ from "lodash";
import { load } from "cheerio";
import axios from "axios";
import { Company } from "@/companies";

// create a function that will additionaly parse elements from the page to get the job link
export const parseLinkElement = (elem: any, item: Company): string => {
  if (item?.URL.includes("welovesalt.com")) return elem.attr("href");

  if (
    item?.name.includes("Randstad Technologies") ||
    item?.name.includes("Trust In Soda")
  ) {
    const suffix = elem.attr("href");
    const url = item?.URL;
    return url + suffix;
  } else {
    return elem.attr("href");
  }
};

export const getJobLinks = (html: string, item: any): string[] => {
  const $ = load(html, { scriptingEnabled: true });
  const uniqueJobLinks = new Set<string>();
  $(item.jobLinkSelector).each((_i, elem) => {
    uniqueJobLinks.add(parseLinkElement($(elem), item));
  });
  return Array.from(uniqueJobLinks);
};

const fetchUrlsFromRecord = async (item: any) => {
  if (
    item.jobLinkSelector === undefined ||
    item.jobLinkSelector === null ||
    item.jobLinkSelector === ""
  ) {
    return null;
  }
  console.log("Scraping item: ", item);
  const companyURL = item?.jobListingURL ?? item?.website_url;

  return axios.get(companyURL).then((response) => {
    const html = response.data;
    const links = getJobLinks(html, item);

    if (response?.status !== 200) {
      console.log("response.status: ", response?.status);
      return [];
    }
    return links;
  });
};

export const checkLatestJobs = async (item: any): Promise<any> => {
  const links = await fetchUrlsFromRecord(item);
  // transform the links to an array of objects
  const linksWithCompany = links?.map((link: any) => {
    return {
      url: link,
      company: item?.name,
    };
  });
  return linksWithCompany;
};
