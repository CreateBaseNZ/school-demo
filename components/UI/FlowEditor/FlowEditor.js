import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  updateEdge,
  MiniMap,
  Controls,
  Background,
  getOutgoers,
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
  const [code, setCode] = useState("");

  const testHandler = () => {
    let blocksConfig = [{ robot: "RoboticArm", type: "start" }];
    let currentNode = getOutgoers(elements[0], elements)[0];
    let traverse = true;
    while (traverse) {
      let block = {
        robot: "RoboticArm",
        value: { ...data[currentNode.id] },
      };
      switch (currentNode.type) {
        case "move":
          block = {
            ...block,
            name: "MoveArm",
            type: "move",
          };
          break;
        case "claw":
          block = {
            ...block,
            name: "ToggleClaw",
            type: "move",
          };
          break;
        default:
          break;
      }
      blocksConfig.push(block);
      const nextNode = getOutgoers(currentNode, elements)[0];
      if (nextNode.id !== "end") {
        currentNode = nextNode;
      } else {
        traverse = false;
        blocksConfig.push({ robot: "RoboticArm", type: "end" });
        console.log(blocksConfig);
        break;
      }
    }
  };

  const onElementsRemove = useCallback((elementsToRemove) => {
    const filteredElements = elementsToRemove.filter(
      (el) => el.id !== "start" && el.id !== "end"
    );
    setElements((els) => removeElements(filteredElements, els));
  }, []);

  const onElementClick = useCallback((event, element) => {
    // if (isNode(element)) {
    //   console.log("this is a node");
    // }
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
    _reactFlowInstance.zoomOut();
    _reactFlowInstance.zoomOut();
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
    const id = getId();
    let defaultValues = null;
    if (type === "claw") {
      defaultValues = { isOpen: true };
    } else if (type === "move") {
      defaultValues = { x: 0, y: 0, z: 0 };
    }
    setData((data) => ({
      ...data,
      [id]: { ...defaultValues },
    }));
    const newNode = {
      id: id,
      type,
      position,
      data: {
        default: defaultValues,
        callBack: (newValues) => {
          setData((state) => ({ ...state, [id]: { ...newValues } }));
        },
      },
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
      <button
        onClick={testHandler}
        style={{ position: "absolute", top: "0", right: "0", zIndex: "10" }}
      >
        CLICK ME
      </button>
    </div>
  );
};

export default FlowEditor;
