import { Edge, Node } from "@xyflow/react";

type AppStateReducerActionType = {
  type: string;
  payload: Node[] | Edge[] | Edge | Node;
};

export default AppStateReducerActionType;
