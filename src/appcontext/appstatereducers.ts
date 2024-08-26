import { Edge, Node } from "@xyflow/react";
import addToArray from "../utilities/add-to-array";
import removeFromArray from "../utilities/remove-from-array";
import AppStateType from "./app-state-type";
import AppStateReducerActionType from "./app-state-reducer-action-type";

const AppReducerActionTypes = Object.freeze({
  SET_NODE_LIST: "SET_NODE_LIST",
  SET_EDGE_LIST: "SET_EDGE_LIST",
  ADD_NODE: "ADD_NODE",
  ADD_EDGE: "ADD_EDGE",
  REMOVE_NODE: "REMOVE_NODE",
  REMOVE_EDGE: "REMOVE_EDGE",
});

const appStateReducer = (
  state: AppStateType,
  action: AppStateReducerActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case AppReducerActionTypes.SET_NODE_LIST:
      console.log("Setting node list: ", payload);
      return state; // { ...state, nodes: payload };
    case AppReducerActionTypes.SET_EDGE_LIST:
      console.log("Setting edge list: ", payload);
      return state; // { ...state, edges: payload };
    case AppReducerActionTypes.ADD_NODE: {
      console.log("Adding node: ", payload);
      return state;
    }
    case AppReducerActionTypes.ADD_EDGE:
      return { ...state, edges: addToArray(state.edges, payload as Edge) };
    case AppReducerActionTypes.REMOVE_NODE:
      return { ...state, nodes: removeFromArray(state.nodes, payload) };
    case AppReducerActionTypes.REMOVE_EDGE:
      return { ...state, edges: removeFromArray(state.edges, payload) };
    default:
      console.log("Unknown action type: ", type);
      return state;
  }
};

export default appStateReducer;
export { AppReducerActionTypes };
