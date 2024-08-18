import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./App.css";
import AddLocationDialog from "./components/add-location-dialog";
import SideMenu from "./components/side-menu";
import LocationNode from "./components/location-node";

const initialNodes = [
  {
    id: "1",
    type: "locationNode",
    data: { label: "The Inn" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

const nodeTypes = { locationNode: LocationNode };

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [menu, setMenu] = useState(null);
  const [displayAddLocationDialog, setDisplayAddLocationDialog] =
    useState(false);
  const ref = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    console.log("onConnect: ", params);
  }, []);

  const onNodeContextMenu = useCallback(
    (event, node) => console.log("onNodeContextMenu: ", event, node),
    []
  );

  const handleMenuAddLocation = () => {
    setDisplayAddLocationDialog(true);
  };

  const handleDialogAddLocation = () => {
    const newLocation = {
      id: `${nodes.length + 1}`,
      data: { label: `Location ${nodes.length + 1}` },
      position: { x: 100, y: 100 },
      type: "locationNode",
    };
    setNodes((nodes) => [...nodes, newLocation]);
    setDisplayAddLocationDialog(false);
  };

  const handleDialogOnClose = () => {
    setDisplayAddLocationDialog(false);
  };

  const onPaneClick = useCallback(() => {
    setDisplayAddLocationDialog(false);
    setMenu(null);
  }, [setMenu, setDisplayAddLocationDialog]);

  const onConnectStart = useCallback((_, { nodeId }) => {
    console.log("onConnectStart: ", _, nodeId);
  }, []);

  const onConnectEnd = useCallback(
    (event) => console.log("onConnectEnd: ", event),
    []
  );

  return (
    <>
      {displayAddLocationDialog ? (
        <AddLocationDialog
          onAdd={handleDialogAddLocation}
          onClose={handleDialogOnClose}
        />
      ) : null}
      <div className="w-screen h-screen">
        <div className="flex flex-row w-full h-full">
          <SideMenu onLocationAdd={handleMenuAddLocation} />
          <div className="w-full h-full">
            <ReactFlow
              ref={ref}
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
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
              {menu && <div style={{ ...menu }}>HELLO</div>}
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
