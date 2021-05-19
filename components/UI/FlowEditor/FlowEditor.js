import { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import DndBar from "./DndBar";

import initialElements from "../../../utils/initialElements";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowEditor = () => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [elements, setElements] = useState(initialElements);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params) => setElements((els) => addEdge(params, els));

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
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
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
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.type === "input") return "#0041d0";
                if (n.type === "output") return "#ff0072";
                if (n.type === "default") return "#1a192b";

                return "#eee";
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;

                return "#fff";
              }}
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
