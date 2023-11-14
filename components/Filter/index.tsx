"use client";
import axios from "axios";
import { Button, Flex } from "antd";
import Preferences from "./Preferences";
import Scrape from "./Scrape";

export default async function Filter() {
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
        <Scrape />
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
