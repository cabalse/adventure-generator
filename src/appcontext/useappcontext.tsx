import { useContext } from "react";
import { ApplicationContext } from "./appcontextprovider";

const useAppContext = () => {
  const context = useContext(ApplicationContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }

  return context;
};

export default useAppContext;
