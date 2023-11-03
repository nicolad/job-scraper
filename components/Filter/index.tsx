"use client";

import { Tag, Modal, Table, Button } from "antd";
import { FilterWrapper, FilterItem } from "./styles";

export default function Filter() {
  const handleScrape = async () => {
    try {
      const response = await fetch("/api/scrape");
      const data = await response.json();
      console.log("Search API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEnrich = async () => {
    try {
      const response = await fetch("/api/enrich");
      const data = await response.json();
      console.log("Search API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <FilterWrapper>
      <Button type="primary" onClick={handleScrape}>
        Scrape
      </Button>
      <Button type="primary" onClick={handleEnrich}>
        Enrich
      </Button>
    </FilterWrapper>
  );
}
