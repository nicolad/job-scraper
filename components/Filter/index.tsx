"use client";

import axios from "axios";
import { Button, Flex } from "antd";
import Preferences from "./Preferences";

export default function Filter() {
  const handleScrape = async () => {
    try {
      const response = await axios("/api/scrape");
      const data = await response?.data;
      console.log("Search API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEnrich = async () => {
    try {
      const response = await axios("/api/enrich");
      const data = await response?.data;
      console.log("Search API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Flex
      gap={20}
      justify="space-between"
      style={{
        margin: "20px",
      }}
    >
      <Flex gap={20}>
        <Button type="primary" onClick={handleScrape}>
          Scrape
        </Button>
        <Button type="primary" onClick={handleEnrich}>
          Enrich
        </Button>
      </Flex>
      <Flex gap={20}>
        <Preferences />
      </Flex>
    </Flex>
  );
}
