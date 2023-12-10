"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useAtom } from "jotai";
import { Job } from "@/types";

import { industryPreferenceAtom } from "@/components/Controls/Preferences";
import { Jobs } from "./Jobs";

export default function ItemList() {
  const [industryPreference] = useAtom(industryPreferenceAtom);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const preferences = industryPreference.industry
        .split(",")
        ?.map((p) => p.trim())
        ?.map((p) => p.toLowerCase());
        console.log(`Fetching jobs with string ${preferences}, with ${industryPreference.searchInContent ? '': 'no '}search in content`);
      try {
        const response = await axios("api/jobs");
        const data: Job[] = await response?.data;

        const filteredJobs = data
          ?.filter((d: any) => !d?.hide)
          ?.filter((d: any) => {
            if (preferences.length === 0) {
              return true;
            }
            return preferences.some((p) =>
              d?.title?.toLowerCase()?.includes(p) || (industryPreference.searchInContent && d?.description?.toLowerCase()?.includes(p))
            );
          });

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  }, [industryPreference]);

  return (
    <>
      <Jobs jobs={jobs.reverse()} />
    </>
  );
}
