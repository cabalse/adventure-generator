import { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import SideMenu from "./components/side-menu";
import LocationNode from "./components/nodes/location-node";
import OpenAI from "openai";

import "@xyflow/react/dist/style.css";
import "./App.css";
import AddEdgeDialog from "./components/dialogs/add-edge-dialog";
import AddEdgeData from "./types/add-edge-data";
import AddLocationDialog from "./components/dialogs/add-location-dialog";
import LoadDialog from "./components/dialogs/load-dialog";

const nodeTypes = {
  locationNode: LocationNode,
};

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
  project: import.meta.env.VITE_OPENAI_PROJECT,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [menu, setMenu] = useState(null);
  const [displayAddLocationDialog, setDisplayAddLocationDialog] =
    useState(false);
  const [displayAddEdgeDialog, setDisplayAddEdgeDialog] = useState(false);
  const [displayLoadDialog, setDisplayLoadDialog] = useState(false);
  const [addEdgeData, setAddEdgeData] = useState<AddEdgeData>({
    edgeLabel: "",
    sourceName: "",
    targetName: "",
    sourceId: "",
    targetId: "",
  });

  const ref = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const getNodeLabel = (nodeId: string) => {
    const node = nodes.find((node) => node.id == nodeId);
    if (node) {
      return node.data.label;
    }
    return "";
  };

  const onConnect = useCallback((params: any) => {
    setDisplayAddEdgeDialog(true);
    setAddEdgeData({
      edgeLabel: "",
      sourceName: getNodeLabel(params.source),
      targetName: getNodeLabel(params.target),
      sourceId: params.source,
      targetId: params.target,
    });
  }, []);

  const onNodeContextMenu = useCallback(
    (event, node) => console.log("onNodeContextMenu: ", event, node),
    []
  );

  const handleMenuAddLocation = () => {
    setDisplayAddLocationDialog(true);
  };

  const handleDialogAddLocation = (data: any) => {
    const newLocation = {
      id: `${nodes.length + 1}`,
      data: { label: data.locationName },
      position: { x: 100, y: 100 },
      type: "locationNode",
    };
    setNodes((nodes) => [...nodes, newLocation]);
    setDisplayAddLocationDialog(false);
  };

  const handleDialogAddEdge = (data: AddEdgeData) => {
    const newEdge = {
      id: `${edges.length + 1}-${data.sourceId}-${data.targetId}`,
      source: data.sourceId,
      target: data.targetId,
      label: data.edgeLabel,
      type: "step",
    };
    setEdges((edges) => [...edges, newEdge]);
    setDisplayAddEdgeDialog(false);
  };

  const handleDialogOnClose = () => {
    setDisplayAddLocationDialog(false);
  };

  const handleAddEdgeDialogOnClose = () => {
    setDisplayAddEdgeDialog(false);
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

  const handleLoadOnClose = () => {
    setDisplayLoadDialog(false);
  };

  const handleMenuLoadClick = () => {
    setDisplayLoadDialog(true);
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

  const onConnectEnd = useCallback((event) => {
    console.log("onConnectEnd: ", event);
  }, []);

  return (
    <>
      {displayAddLocationDialog ? (
        <AddLocationDialog
          onAdd={handleDialogAddLocation}
          onClose={handleDialogOnClose}
        />
      ) : null}
      {displayAddEdgeDialog ? (
        <AddEdgeDialog
          data={addEdgeData}
          onAdd={handleDialogAddEdge}
          onClose={handleAddEdgeDialogOnClose}
        />
      ) : null}
      {displayLoadDialog ? (
        <LoadDialog
          displayDialog={displayLoadDialog}
          onClose={handleLoadOnClose}
        />
      ) : null}
      <div className="w-screen h-screen">
        <div className="flex flex-row w-full h-full">
          <SideMenu
            onLocationAdd={handleMenuAddLocation}
            onGenerateAdventure={handleGenerateAdventure}
            onLoad={handleMenuLoadClick}
            onSave={() => console.log("Save")}
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
