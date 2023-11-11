"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const industryPreferenceAtom = atomWithStorage("industryPreference", "");

import { Jobs } from "./Jobs";

export default function ItemList() {
  const [industryPreference] = useAtom(industryPreferenceAtom);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const preferences = industryPreference
        .split(",")
        ?.map((p) => p.trim())
        ?.map((p) => p.toLowerCase());

      try {
        const response = await axios("api/jobs");
        const data = await response?.data;
        const filteredJobs = data
          ?.filter((d: any) => !d?.hide)
          ?.filter((d: any) => {
            if (preferences.length === 1) {
              return true;
            }
            const contentWords = _.words(d?.content?.toLowerCase());
            return preferences.some((p) =>
              contentWords.includes(p.toLowerCase())
            );
          });

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  }, [industryPreference]);

  return <Jobs jobs={jobs} />;
}
