import AppState from "./types/app-state";

const initialAppState: AppState = {
  nodes: [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
  ],
  edges: [],
  displayDialog: "",
};

export default initialAppState;
