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

// create a function that will additionaly parse elements from the page to get the job link
export const parseLinkElement = (elem: any, item: any): string => {
  if (item?.name.includes("Randstad Technologies")) {
    const suffix = elem.attr("href");
    const url = item?.URL;
    return url + suffix;
  } else {
    console.log("elem: ", elem.attr("href"));
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
      company: item?.Name,
    };
  });
  return linksWithCompany;
};
