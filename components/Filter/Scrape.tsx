"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Select, Flex } from "antd";
import { getCompanies } from "@/app/actions";

export default function Filter() {
  const [companies, setCompanies] = useState([
    {
      name: "",
      URL: "",
    },
  ]);
  const [selectedCompany, setSelectedCompany] = useState("");
  console.log("companies", companies);

  useEffect(() => {
    async function fetchCompanies() {
      const companiesData = await getCompanies();
      setCompanies(companiesData);
    }

    fetchCompanies();
  }, []);

  const handleScrape = async () => {
    try {
      const response = await axios.get("/api/scrape", {
        params: {
          company: selectedCompany,
        },
      });
      const data = await response?.data;
      console.log("Search API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value);
  };

  return (
    <Flex gap={20}>
      <Select
        placeholder="All"
        style={{ width: 200 }}
        onChange={handleCompanyChange}
        value={selectedCompany}
      >
        {companies.map((company) => (
          <Select.Option key={company?.URL} value={company?.name}>
            {company?.name}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleScrape}>
        Scrape
      </Button>
    </Flex>
  );
}
