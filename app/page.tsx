"use client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ItemList from "@/components/ItemList";
import Filter from "@/components/Filter";
import { getCompanies } from "@/app/actions";

export default function Home() {
  const queryClient = new QueryClient();
  const methods = useForm();

  useEffect(() => {
    async function fetchCompanies() {
      const companies = await getCompanies();
      methods.setValue("companies", companies);
    }

    fetchCompanies();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>
        <Filter />
        <ItemList />
      </FormProvider>
    </QueryClientProvider>
  );
}
