import { useState, useCallback, useRef, useEffect } from "react";
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
import LocationNode from "./components/nodes/location-node";
import DiamondNode from "./components/nodes/diamond-node";
import CircleNode from "./components/nodes/circle-node";
import StartEndNode from "./components/nodes/start-end-node";
import OpenAI from "openai";

const initialNodes = [
  {
    id: "1",
    type: "startEndNode",
    data: { label: "The Inn" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "diamondNode",
    data: { label: "The Inn" },
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    type: "circleNode",
    data: { label: "The Inn" },
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    type: "startEndNode",
    data: { label: "The Inn" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

const nodeTypes = {
  locationNode: LocationNode,
  diamondNode: DiamondNode,
  circleNode: CircleNode,
  startEndNode: StartEndNode,
};

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
  project: import.meta.env.VITE_OPENAI_PROJECT,
  dangerouslyAllowBrowser: true,
});

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

  const handleGenerateAdventure = () => {
    console.log("Generating adventure... [Turned off for now]");
    // chatWithAI("Say this is a test")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const chatWithAI = async (message: string) => {
    return await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo",
    });
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
          <SideMenu
            onLocationAdd={handleMenuAddLocation}
            onGenerateAdventure={handleGenerateAdventure}
          />
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
