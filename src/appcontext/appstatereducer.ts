import { Edge, Node } from "@xyflow/react";
import addToArray from "../utilities/add-to-array";
import removeFromArray from "../utilities/remove-from-array";
import AppStateType from "./types/app-state";
import ReducerAction from "./types/reducer-action";

const ReducerActionTypes = Object.freeze({
  SET_NODE_LIST: "SET_NODE_LIST",
  SET_EDGE_LIST: "SET_EDGE_LIST",
  ADD_NODE: "ADD_NODE",
  ADD_EDGE: "ADD_EDGE",
  UPDATE_NODE: "UPDATE_NODE",
  UPDATE_EDGE: "UPDATE_EDGE",
  REMOVE_NODE: "REMOVE_NODE",
  REMOVE_EDGE: "REMOVE_EDGE",
  DISPLAY_DIALOG: "DISPLAY_DIALOG",
  CLOSE_DIALOG: "CLOSE_DIALOG",
});

const appStateReducer = (
  state: AppStateType,
  action: ReducerAction
): AppStateType => {
  const { type, payload } = action;

  switch (type) {
    case ReducerActionTypes.SET_NODE_LIST:
      console.log("Setting node list: ", payload);
      return state; // { ...state, nodes: payload };
    case ReducerActionTypes.SET_EDGE_LIST:
      console.log("Setting edge list: ", payload);
      return state; // { ...state, edges: payload };
    case ReducerActionTypes.ADD_NODE: {
      console.log("Adding node: ", payload);
      return state;
    }
    case ReducerActionTypes.ADD_EDGE:
      return { ...state, edges: addToArray(state.edges, payload as Edge) };
    case ReducerActionTypes.REMOVE_NODE:
      return { ...state, nodes: removeFromArray(state.nodes, payload as Node) };
    case ReducerActionTypes.REMOVE_EDGE:
      return { ...state, edges: removeFromArray(state.edges, payload as Edge) };
    case ReducerActionTypes.UPDATE_NODE:
      return {
        ...state,
        nodes: (payload as (nds: Node[]) => Node[])(state.nodes) as Node[],
      };
    case ReducerActionTypes.DISPLAY_DIALOG:
      return { ...state, displayDialog: payload as string };
    case ReducerActionTypes.CLOSE_DIALOG:
      return { ...state, displayDialog: "" };
    default:
      console.log("Unknown action type: ", type);
      return state;
  }
};

export default appStateReducer;
export { ReducerActionTypes };
