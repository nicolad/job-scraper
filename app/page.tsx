"use client";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ItemList from "@/components/ItemList";
import Filter from "@/components/Filter";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Filter />
        <ItemList />
      </Provider>
    </QueryClientProvider>
  );
}
