"use client";

import { useState } from "react";
import axios from "axios";
import { Button, Flex } from "antd";
import Preferences from "./Preferences";
import Messages from "./Messages";

export default function Filter() {
  const [threadID, setThreadID] = useState("");
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

  const handleRetrieval = async () => {
    try {
      const response = await axios("/api/retrieval");
      const data = await response?.data;
      setThreadID(data.id);
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
        <Button type="primary" onClick={handleRetrieval}>
          Retrieval
        </Button>
      </Flex>
      <Flex gap={20}>
        <Preferences />
        <Messages threadID={threadID} />
      </Flex>
    </Flex>
  );
}
