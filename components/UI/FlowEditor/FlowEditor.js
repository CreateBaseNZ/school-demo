import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  SmoothStepEdge,
} from "react-flow-renderer";
import DndBar from "./DndBar";
import MoveNode from "./MoveNode";
import ReadNode from "./ReadNode";
import SetNode from "./SetNode";
import PauseNode from "./PauseNode";
import CustomEdge, { CustomConnectionLine } from "./CustomEdge";

import initialElements from "../../../utils/initialElements";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  move: MoveNode,
  read: ReadNode,
  set: SetNode,
  pause: PauseNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const miniMapStrokeColoriser = (node) => {
  if (node.style?.background) return node.style.background;
  if (node.type === "input") return "#0041d0";
  if (node.type === "output") return "#ff0072";
  if (node.type === "default") return "#1a192b";

  return "#eee";
};

const miniMapColoriser = (node) => {
  if (node.style?.background) return node.style.background;

  return "#fff";
};

const FlowEditor = () => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  console.log(elements);

  const onElementsRemove = useCallback((elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }, []);

  const onConnect = useCallback((params) => {
    setElements((els) => {
      return addEdge({ ...params, type: "custom", animated: true }, els);
    });
  }, []);

  const onLoad = (_reactFlowInstance) => {
    console.log("flow loaded:", _reactFlowInstance);
    _reactFlowInstance.fitView();
    setReactFlowInstance(_reactFlowInstance);
  };

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
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
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
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            snapToGrid={true}
            snapGrid={[16, 16]}
            connectionLineComponent={CustomConnectionLine}
          >
            <MiniMap
              nodeStrokeColor={miniMapStrokeColoriser}
              nodeColor={miniMapColoriser}
              nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowEditor;
