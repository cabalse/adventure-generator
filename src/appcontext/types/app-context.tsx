import AppState from "./app-state";
import ReducerAction from "./reducer-action";

type AppContext = {
  appState: AppState;
  appStateDispatch: React.Dispatch<ReducerAction>;
};

export default AppContext;
