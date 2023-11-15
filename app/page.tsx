"use client";
import { FormProvider, useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ItemList from "@/components/ItemList";
import Filter from "@/components/Filter";

export default function Home() {
  const queryClient = new QueryClient();
  const methods = useForm();

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>
        <Filter />
        <ItemList />
      </FormProvider>
    </QueryClientProvider>
  );
}
