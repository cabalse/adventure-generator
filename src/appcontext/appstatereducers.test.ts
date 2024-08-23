import { describe, it, expect, vi } from "vitest";
import addToArray from "../utilities/add-to-array";
import removeFromArray from "../utilities/remove-from-array";
import appStateReducer, { AppReducerActionTypes } from "./appstatereducers";

vi.mock("../utilities/add-to-array", () => ({
  default: vi.fn((array, item) => [...array, item]),
}));

vi.mock("../utilities/remove-from-array", () => ({
  default: vi.fn((array, item) => array.filter((i) => i !== item)),
}));

describe("appStateReducer", () => {
  const initialState = {
    nodeList: [],
    edgeList: [],
  };

  it("Handles SET_NODE_LIST", () => {
    const action = {
      type: AppReducerActionTypes.SET_NODE_LIST,
      payload: [1, 2, 3],
    };
    const newState = appStateReducer(initialState, action);
    expect(newState.nodeList).toEqual([1, 2, 3]);
  });

  it("Handles SET_EDGE_LIST", () => {
    const action = {
      type: AppReducerActionTypes.SET_EDGE_LIST,
      payload: [4, 5, 6],
    };
    const newState = appStateReducer(initialState, action);
    expect(newState.edgeList).toEqual([4, 5, 6]);
  });

  it("Handles ADD_NODE", () => {
    const action = { type: AppReducerActionTypes.ADD_NODE, payload: 7 };
    const newState = appStateReducer(
      { ...initialState, nodeList: [1, 2, 3] },
      action
    );
    expect(addToArray).toHaveBeenCalledWith([1, 2, 3], 7);
    expect(newState.nodeList).toEqual([1, 2, 3, 7]);
  });

  it("Handles ADD_EDGE", () => {
    const action = { type: AppReducerActionTypes.ADD_EDGE, payload: 8 };
    const newState = appStateReducer(
      { ...initialState, edgeList: [4, 5, 6] },
      action
    );
    expect(addToArray).toHaveBeenCalledWith([4, 5, 6], 8);
    expect(newState.edgeList).toEqual([4, 5, 6, 8]);
  });

  it("Handles REMOVE_NODE", () => {
    const action = { type: AppReducerActionTypes.REMOVE_NODE, payload: 2 };
    const newState = appStateReducer(
      { ...initialState, nodeList: [1, 2, 3] },
      action
    );
    expect(removeFromArray).toHaveBeenCalledWith([1, 2, 3], 2);
    expect(newState.nodeList).toEqual([1, 3]);
  });

  it("Handles REMOVE_EDGE", () => {
    const action = { type: AppReducerActionTypes.REMOVE_EDGE, payload: 5 };
    const newState = appStateReducer(
      { ...initialState, edgeList: [4, 5, 6] },
      action
    );
    expect(removeFromArray).toHaveBeenCalledWith([4, 5, 6], 5);
    expect(newState.edgeList).toEqual([4, 6]);
  });

  it("Returns current state for unknown action types", () => {
    const action = { type: "UNKNOWN_ACTION", payload: null };
    const newState = appStateReducer(initialState, action);
    expect(newState).toBe(initialState);
  });
});
