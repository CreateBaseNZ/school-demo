import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  isNode,
  removeElements,
  addEdge,
  updateEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import DndBar from "./DndBar";
import StartNode from "./StartNode";
import EndNode from "./EndNode";
import MoveNode from "./MoveNode";
import ClawNode from "./ClawNode";
import ReadNode from "./ReadNode";
import SetNode from "./SetNode";
import PauseNode from "./PauseNode";
import CustomEdge, { CustomConnectionLine } from "./CustomEdge";

import initialElements from "../../../utils/initialElements";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialData = {
  start: {},
  end: {},
};

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  claw: ClawNode,
  read: ReadNode,
  set: SetNode,
  pause: PauseNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const miniMapStrokeColoriser = (node) => {
  switch (node.type) {
    case "move":
      return "#0a73dc";
    case "claw":
      return "#0a73dc";
    case "read":
      return "#8258dc";
    case "set":
      return "#36c4e8";
    case "pause":
      return "#ffb649";
    case "start":
      return "#18dbac";
    case "end":
      return "#fa6f6f";
    default:
      return "#ffffff";
  }
};

const miniMapColoriser = (node) => {
  return "none";
};

const FlowEditor = () => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onElementsRemove = useCallback((elementsToRemove) => {
    const filteredElements = elementsToRemove.filter(
      (el) => el.id !== "start" && el.id !== "end"
    );
    setElements((els) => removeElements(filteredElements, els));
  }, []);

  const onElementClick = useCallback((event, element) => {
    if (isNode(element)) {
      console.log("this is a node");
    }
  }, []);

  const onConnect = useCallback((params) => {
    console.log(params);
    setElements((els) => {
      return addEdge(
        {
          ...params,
          type: "custom",
          animated: true,
          arrowHeadType: "arrowclosed",
        },
        els
      );
    });
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setElements((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onLoad = useCallback((_reactFlowInstance) => {
    console.log("flow loaded:", _reactFlowInstance);

    _reactFlowInstance.fitView();
    setReactFlowInstance(_reactFlowInstance);
  }, []);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
    const [type, x, y] = event.dataTransfer
      .getData("application/reactflow")
      .split("-");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - parseFloat(x),
      y: event.clientY - reactFlowBounds.top - parseFloat(y),
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: {
        label: `${type} node`,
        input: true,
        callBack: (input) =>
          setData((state) => ({ ...state, id: { input: !input } })),
      },
    };

    setElements((es) => es.concat(newNode));
    setData((data) => ({...data, newNode.id: {input: newNode.data.input} }));
  };

  return (
    <div className={classes.editorContainer}>
      <ReactFlowProvider>
        <DndBar />

        <div className={classes.editorWrapper} ref={wrapperRef}>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onLoad={onLoad}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            snapToGrid={true}
            snapGrid={[16, 16]}
            connectionLineComponent={CustomConnectionLine}
            arrowHeadColor="#ffffff"
          >
            <MiniMap
              nodeStrokeColor={miniMapStrokeColoriser}
              nodeColor={miniMapColoriser}
              nodeBorderRadius={16}
              nodeStrokeWidth={4}
              maskColor="rgba(0,0,0,0.5)"
              style={{
                backgroundColor: "#1d1d1d",
                height: "100",
                width: "150",
              }}
              className={classes.miniMap}
            />
            <Controls className={classes.controls} />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowEditor;
