"use client";

import { useAppContext } from "@/utils/appContext";
import { FilterWrapper, FilterItem } from "./styles";

export default function Filter() {
  const { filter, setFilter } = useAppContext();

  const handleFilterToggle = (filterItem:string) => {
    const isItemInFilter = filter.includes(filterItem);

    const updatedFilter = isItemInFilter
      ? filter.filter((item) => item !== filterItem)
      : [...filter, filterItem];

    setFilter(updatedFilter);
  };

  return (
    <FilterWrapper>
      <FilterItem
        onClick={() => handleFilterToggle("Not Done")}
        active={filter.includes("Not Done")}
      >
        Not Done
      </FilterItem>
      <FilterItem
        onClick={() => handleFilterToggle("In Progress")}
        active={filter.includes("In Progress")}
      >
        In Progress
      </FilterItem>
      <FilterItem
        onClick={() => handleFilterToggle("Done")}
        active={filter.includes("Done")}
      >
        Done
      </FilterItem>
    </FilterWrapper>
  );
}
