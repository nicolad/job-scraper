"use client";
import { Provider } from "jotai";

import ItemList from "@/components/ItemList";

import Filter from "@/components/Filter";

export default function Home() {
  return (
    <Provider>
      <Filter />
      <ItemList />
    </Provider>
  );
}
