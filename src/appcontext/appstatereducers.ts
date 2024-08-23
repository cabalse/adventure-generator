import addToArray from "../utilities/add-to-array";
import removeFromArray from "../utilities/remove-from-array";

const AppReducerActionTypes = Object.freeze({
  SET_NODE_LIST: "SET_NODE_LIST",
  SET_EDGE_LIST: "SET_EDGE_LIST",
  ADD_NODE: "ADD_NODE",
  ADD_EDGE: "ADD_EDGE",
  REMOVE_NODE: "REMOVE_NODE",
  REMOVE_EDGE: "REMOVE_EDGE",
});

const appStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AppReducerActionTypes.SET_NODE_LIST:
      return { ...state, nodeList: payload };
    case AppReducerActionTypes.SET_EDGE_LIST:
      return { ...state, edgeList: payload };
    case AppReducerActionTypes.ADD_NODE:
      return { ...state, nodeList: addToArray(state.nodeList, payload) };
    case AppReducerActionTypes.ADD_EDGE:
      return { ...state, edgeList: addToArray(state.edgeList, payload) };
    case AppReducerActionTypes.REMOVE_NODE:
      return { ...state, nodeList: removeFromArray(state.nodeList, payload) };
    case AppReducerActionTypes.REMOVE_EDGE:
      return { ...state, edgeList: removeFromArray(state.edgeList, payload) };
    default:
      console.log("Unknown action type: ", type);
      return state;
  }
};

export default appStateReducer;
export { AppReducerActionTypes };
