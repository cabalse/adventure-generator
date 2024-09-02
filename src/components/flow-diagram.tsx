import {
  applyNodeChanges,
  Background,
  Controls,
  NodeChange,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useRef } from "react";
import useAppContext from "../appcontext/useappcontext";
import { ReducerActionTypes } from "../appcontext/appstatereducer";

const FlowDiagram = () => {
  const { appState, appStateDispatch } = useAppContext();
  const ref = useRef(null);

  const onPaneClick = useCallback(() => {
    // appStateDispatch({ type: ReducerActionTypes.CLOSE_DIALOG, payload: "" });
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      appStateDispatch({
        type: ReducerActionTypes.UPDATE_NODE,
        payload: (nds) => applyNodeChanges(changes, nds),
      }),
    []
  );

  return (
    <ReactFlow
      ref={ref}
      nodes={appState.nodes}
      onNodesChange={onNodesChange}
      edges={appState.edges}
      onEdgesChange={() => console.log("onEdgesChange")}
      onConnect={() => console.log("onConnect")}
      onConnectStart={() => console.log("onConnectStart")}
      onConnectEnd={() => console.log("onConnectEnd")}
      onNodeContextMenu={() => console.log("onNodeContextMenu")}
      onPaneClick={onPaneClick}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default FlowDiagram;

{
  /* <ReactFlow
      ref={ref}
      nodes={appState.nodes}
      onNodesChange={onNodesChange}
      edges={appState.edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onNodeContextMenu={onNodeContextMenu}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      fitView
    ></ReactFlow> */
}
