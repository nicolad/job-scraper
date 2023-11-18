export interface Company {
  name: string;
  URL: string;
  Focus?: string;
  linkedinJobsURL?: string;
  jobListingURL?: string;
  jobStartsWith?: string;
  jobLinkSelector?: string;
  jobTitleSelector?: string;
  jobDescriptionSelector?: string;
  jobSection?: string;
  jobTitle?: string;
}

export const companies: Company[] = [
  {
    name: "Computer Futures",
    URL: "https://www.computerfutures.com/",
  },
  {
    name: "Randstad Technologies",
    URL: "https://www.randstad.co.uk",
    jobListingURL: "https://www.randstad.co.uk/jobs/contract/remote/",
    jobLinkSelector: "div#search-results ul.cards__list li div.cards__header a",
    jobTitleSelector: "h1.content-block__title",
    jobDescriptionSelector: "div#job-details",
  },
  {
    name: "Harvey Nash",
    URL: "https://www.harveynash.com/uk/",
    jobListingURL: "https://www.harveynash.co.uk/jobs?options=4",
  },
  {
    name: "Spinks",
    URL: "https://www.wearespinks.com/",
    jobListingURL: "https://www.wearespinks.com/jobs/contract",
  },
  {
    name: "Reed Technology",
    URL: "https://www.reedglobal.com/",
  },
  {
    name: "Modis",
    URL: "https://www.modis.com/en-gb/",
    jobListingURL: "https://www.akkodis.com/en/careers/job-results-uk",
  },
  {
    name: "Xpertise Recruitment",
    URL: "https://www.xpertise-recruitment.com/",
    jobListingURL: "https://www.xpertise-recruitment.com/jobs",
    jobLinkSelector: "#search_results_box div.job-item a.ji-link",
    jobTitleSelector: "h3.gen-title",
    jobDescriptionSelector: "div.hc-job-info",
  },
  {
    name: "La Fosse Associates",
    Focus: "Technology, Digital",
    URL: "https://www.lafosse.com/",
    jobListingURL: "https://www.lafosse.com/jobs/contract-jobs",
    jobSection: ".main-content",
    jobTitle: ".single_job_listing",
  },
  {
    name: "Trust In Soda",
    Focus: "Digital and Tech",
    URL: "https://www.trustinsoda.com",
    jobListingURL: "https://www.trustinsoda.com/jobs/contract/remote",
    jobLinkSelector: ".job-title a",
    jobDescriptionSelector: ".job-description",
  },
  {
    name: "Salt",
    Focus: "Creative, Tech",
    URL: "https://www.welovesalt.com/uk/",
    jobListingURL: "https://welovesalt.com/jobs/job-type/contract",
    jobLinkSelector: ".job__title a",
    jobStartsWith: "https://welovesalt.com/jobs/technology",
    jobDescriptionSelector: ".richtext",
  },
  {
    name: "Explore Group",
    Focus: "IT, Digital",
    URL: "https://www.explore-group.com/",
    linkedinJobsURL:
      "https://www.linkedin.com/jobs/search/?currentJobId=3760191183&f_C=578309&f_WT=2&geoId=92000000&origin=JOB_SEARCH_PAGE_JOB_FILTER",
  },
  {
    name: "Burns Sheehan",
    Focus: "Technology",
    URL: "https://www.burnssheehan.co.uk/",
  },
  {
    name: "Arrows Group",
    Focus: "Tech and Digital",
    URL: "https://www.arrowsgroup.com/",
  },
  {
    name: "Empiric",
    Focus: "Technology",
    URL: "https://www.empiric.com/",
  },
  {
    name: "Nigel Frank International",
    Focus: "Microsoft Technologies",
    URL: "https://www.nigelfrank.com/",
  },
  {
    name: "Henderson Scott",
    Focus: "Technology",
    URL: "https://www.hendersonscott.com/",
  },
  {
    name: "Oliver Bernard",
    Focus: "Tech and Digital",
    URL: "https://www.oliverbernard.co.uk/",
  },
  {
    name: "Avanti Recruitment",
    Focus: "IT and Tech",
    URL: "https://www.avantirecruitment.com/",
  },
  {
    name: "GCS Recruitment",
    Focus: "IT, Engineering",
    URL: "https://www.gcsrecruitment.com/",
  },
  {
    name: "Client Server",
    Focus: "Tech",
    URL: "https://www.client-server.com/",
  },
  {
    name: "Intelligent People",
    Focus: "Digital and Tech",
    URL: "https://www.intelligentpeople.co.uk/",
  },
  {
    name: "Revoco",
    Focus: "Tech",
    URL: "https://www.revoco-talent.co.uk/",
  },
  {
    name: "William Alexander",
    Focus: "IT and Business Transformation",
    URL: "https://www.william-alexander.com/",
  },
  {
    name: "iO Associates",
    Focus: "Tech, Engineering",
    URL: "https://www.ioassociates.co.uk/",
  },
  {
    name: "Signify Technology",
    Focus: "Scala, Java",
    URL: "https://www.signifytechnology.com/",
  },
  {
    name: "Prism Digital",
    Focus: "DevOps, Cloud",
    URL: "https://www.prism-digital.com/",
  },
  {
    name: "Energize Recruitment",
    Focus: "IT, Digital",
    URL: "https://www.energizerecruitment.com/",
  },
  {
    name: "Etonwood",
    Focus: "Infrastructure, Cloud",
    URL: "https://etonwood.com/",
  },
  {
    name: "Durlston Partners",
    Focus: "Technology",
    URL: "https://durlstonpartners.com/",
  },
  {
    name: "Annapurna Recruitment",
    Focus: "IT, Business Change",
    URL: "https://www.annapurnarecruitment.com/",
  },
  {
    name: "Gibbs Hybrid",
    Focus: "IT, Business Services",
    URL: "https://www.gibbshybrid.com/",
  },
  {
    name: "Sentinel",
    Focus: "IT, Business Transformation",
    URL: "https://www.sentinelit.com/",
  },
  {
    name: "Tiro Partners",
    Focus: "Tech, Engineering",
    URL: "https://www.tiropartners.com/",
  },
  {
    name: "Mason Frank",
    Focus: "Salesforce Recruitment",
    URL: "https://www.masonfrank.com/",
  },
  {
    name: "Vertex Solutions",
    Focus: "Tech, Financial Services",
    URL: "https://www.vertex-solutions.co.uk/",
  },
  {
    name: "Understanding Recruitment",
    Focus: "Tech",
    URL: "https://www.understandingrecruitment.co.uk/",
  },
  {
    name: "Zebra People",
    Focus: "Digital",
    URL: "https://zebrapeople.com/",
  },
  {
    name: "SR2",
    Focus: "Tech",
    URL: "https://www.sr2rec.co.uk/",
  },
  {
    name: "DCV Technologies",
    Focus: "Tech, Engineering",
    URL: "https://www.dcvtechnologies.co.uk/",
  },
  {
    name: "Amicus Recruitment",
    Focus: "Software Development",
    URL: "https://amicusjobs.co.uk/",
  },
  {
    name: "Stott and May",
    Focus: "Tech",
    URL: "https://www.stottandmay.com/",
  },
  {
    name: "Oho Group",
    Focus: "Tech, Engineering",
    URL: "https://www.oho.co.uk/",
  },
  {
    name: "Adria Solutions",
    Focus: "Tech",
    URL: "https://www.adriasolutions.co.uk/",
  },
  {
    name: "Datascope Recruitment",
    Focus: "Gaming, Tech",
    URL: "https://datascope.co.uk/",
  },
  {
    name: "Edison Hill",
    Focus: "Tech",
    URL: "https://www.edison-hill.co.uk/",
  },
  {
    name: "Codex Recruitment",
    Focus: "Data, Tech",
    URL: "https://www.codexrecruitment.com/",
  },
  {
    name: "Templeton & Partners",
    Focus: "IT, Tech",
    URL: "https://jobs.templeton-recruitment.com",
    jobListingURL: "https://jobs.templeton-recruitment.com/job-search",
  },
  {
    name: "efinancialcareers",
    Focus: "General Jobs",
    jobListingURL:
      "https://www.efinancialcareers.co.uk/jobs/remote/technology/in-united-kingdom?q=technology&countryCode=GB&radius=40&radiusUnit=km&pageSize=15&filters.workArrangementType=REMOTE&filters.sectors=INFORMATION_TECHNOLOGY%7CFINTECH&filters.locationPath=Europe%2FUnited+Kingdom&currencyCode=GBP&language=en&includeUnspecifiedSalary=true",
    URL: "https://www.efinancialcareers.co.uk/",
    jobLinkSelector: "div.component-card-job-search a.job-title",
    jobTitleSelector: "efc-job-header-description div.job-info-data h1",
    jobDescriptionSelector: "efc-job-description.job-description",
  },
];
