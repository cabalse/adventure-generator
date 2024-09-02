import { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnectStartParams,
  Connection,
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
import useAppContext from "./appcontext/useappcontext";
import PageTemplate from "./components/page-template";
import FlowDiagram from "./components/flow-diagram";
import dialogs from "./constants/dialogs";
import { ReducerActionTypes } from "./appcontext/appstatereducer";

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
  const { appState, appStateDispatch } = useAppContext();
  const [addEdgeData, setAddEdgeData] = useState<AddEdgeData>({
    edgeLabel: "",
    sourceName: "",
    targetName: "",
    sourceId: "",
    targetId: "",
  });

  const ref = useRef(null);

  const onNodesChange = useCallback(
    (changes) =>
      appStateDispatch({
        type: AppReducerActionTypes.SET_NODE_LIST,
        payload: (nds) => applyNodeChanges(changes, nds),
      }),
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

  const onConnect = useCallback((params: Connection) => {
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
      id: `${appState.nodes.length + 1}`,
      data: { label: data.locationName },
      position: { x: 100, y: 100 },
      type: "locationNode",
    };
    appStateDispatch({
      type: AppReducerActionTypes.ADD_NODE,
      payload: newLocation,
    });
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

  const onConnectStart = useCallback(
    (event: MouseEvent | TouchEvent, { nodeId }: OnConnectStartParams) => {
      console.log("onConnectStart: ", event, nodeId);
    },
    []
  );

  const onConnectEnd = useCallback((event: MouseEvent | TouchEvent) => {
    console.log("onConnectEnd: ", event);
  }, []);

  const loadDialog = () => {
    return (
      <>
        {appState.displayDialog == dialogs.LOAD ? (
          <LoadDialog
            onClose={() =>
              appStateDispatch({
                type: ReducerActionTypes.CLOSE_DIALOG,
                payload: "",
              })
            }
          />
        ) : null}
      </>
    );
  };

  const addLocationDialog = () => {
    return (
      <>
        {appState.displayDialog === dialogs.ADD_LOCATION ? (
          <AddLocationDialog
            onAdd={handleDialogAddLocation}
            onClose={handleDialogOnClose}
          />
        ) : null}
      </>
    );
  };

  const addEdgeDialog = () => {
    return (
      <>
        {appState.displayDialog === dialogs.ADD_EDGE ? (
          <AddEdgeDialog
            data={addEdgeData}
            onAdd={handleDialogAddEdge}
            onClose={handleAddEdgeDialogOnClose}
          />
        ) : null}
      </>
    );
  };

  return (
    <>
      {loadDialog()}
      {addLocationDialog()}
      {addEdgeDialog()}
      <PageTemplate>
        <FlowDiagram />
      </PageTemplate>
    </>
  );
}

export default App;
