import { Background, Controls, ReactFlow } from "@xyflow/react";

const FlowDiagram = () => {
  return (
    <ReactFlow
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
    >
      <Background />
      <Controls />
      {/* {menu && <div>HELLO</div>} */}
    </ReactFlow>
  );
};

export default FlowDiagram;
