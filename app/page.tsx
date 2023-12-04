"use client";
import { FormProvider, useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ItemList from "@/components/ItemList";
import Controls from "@/components/Controls";

export default function Home() {
  const queryClient = new QueryClient();
  const methods = useForm();

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>
        <Controls />
        <ItemList />
      </FormProvider>
    </QueryClientProvider>
  );
}
