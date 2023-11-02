"use client";

import { createContext, useContext, useState } from "react";

interface ContextProps {
  isUpvoting: boolean;
  setIsUpvoting: (value: boolean) => void;
  filter: string[];
  setFilter: (value: string[]) => void;
}

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [filter, setFilter] = useState<string[]>(["Not Done"]);

  return (
    <AppContext.Provider
      value={{
        isUpvoting,
        setIsUpvoting,
        filter,
        setFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
