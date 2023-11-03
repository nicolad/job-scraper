"use client";
import { useEffect, useState } from "react";
import { Jobs } from "./Jobs";

export default function ItemList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("api/jobs");
        const data = await response.json();
        const filteredJobs = data.filter((d: any) => !d?.hide);
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  return <Jobs jobs={jobs} />;
}
