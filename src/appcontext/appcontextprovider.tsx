import React, { createContext, useReducer } from "react";

import initialAppState from "./initialappstate";
import appStateReducer from "./appstatereducer";
import ReducerAction from "./types/reducer-action";
import AppContext from "./types/app-context";

const initialContextValue: AppContext = {
  appState: initialAppState,
  appStateDispatch: (() => {}) as React.Dispatch<ReducerAction>,
};

const ApplicationContext = createContext(initialContextValue);

type Props = {
  children: React.ReactNode;
};

const AppContextprovider = ({ children }: Props) => {
  const [state, appStateDispatch] = useReducer(
    appStateReducer,
    initialAppState
  );

  const contextValue: AppContext = {
    appState: state,
    appStateDispatch: appStateDispatch,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default AppContextprovider;
export { ApplicationContext };
