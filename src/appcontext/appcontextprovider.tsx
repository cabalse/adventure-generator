import React, { createContext, useReducer } from "react";

import initialAppState from "./initialappstate";
import appStateReducer from "./appstatereducers";
import AppStateType from "./app-state-type";

const initialContextValue = {
  appState: initialAppState,
  appStateDispatch: (() => {}) as React.Dispatch<AppStateType>,
};

const ApplicationContext = createContext(initialContextValue);

type Props = {
  children: React.ReactNode;
};

type ContextValueType = {
  appState: AppStateType;
  appStateDispatch: React.Dispatch<AppStateType>;
};

const AppContextprovider = ({ children }: Props) => {
  const [state, appStateDispatch] = useReducer(
    appStateReducer,
    initialAppState
  );

  const contextValue: ContextValueType = {
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
