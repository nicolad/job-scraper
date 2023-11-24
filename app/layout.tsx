import { AppContextProvider } from "@/utils/appContext";

export const metadata = {
  title: "Job Scraper",
  description: "Collect information from job sites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppContextProvider>
  );
}
