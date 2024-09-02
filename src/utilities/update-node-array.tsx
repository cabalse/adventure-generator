import { Node, NodeChange } from "@xyflow/react";

const updateNodeArray = (nodes: Node[], changes: NodeChange[]): Node[] => {
  const updatedNodes = [...nodes];

  console.log("updatedNodes", updatedNodes);

  changes.forEach((value: NodeChange) => {
    const nodeIndex = updatedNodes.findIndex(
      (node) => node.id === (value as NodeChange).id
    );
    const updatedNode = { ...updatedNodes[nodeIndex], ...value.data };
    updatedNodes[nodeIndex] = updatedNode;
  });
  return updatedNodes;
};

export default updateNodeArray;
