import { Edge, Node, NodeChange } from "@xyflow/react";

type ReducerAction = {
  type: string;
  payload:
    | Node[]
    | Edge[]
    | Edge
    | Node
    | NodeChange[]
    | string
    | ((nds: Node[]) => Node[]);
};

export default ReducerAction;
