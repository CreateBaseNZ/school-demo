import React, {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  updateEdge,
  MiniMap,
  Controls,
  Background,
  getOutgoers,
  getConnectedEdges,
  getIncomers,
} from "react-flow-renderer";
import {
  initialData,
  nodeTypes,
  edgeTypes,
  miniMapColoriser,
  miniMapStrokeColoriser,
} from "/utils/flowConfig";
import DndBar from "./DndBar";

import { CustomConnectionLine } from "./CustomEdge";

import initialElements from "/utils/initialElements";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const findNextNode = (currentNode, path, elements) => {
  const nodes = [currentNode];
  let nodeCollection = getConnectedEdges(nodes, elements);
  let nextNodeList = getOutgoers(currentNode, elements);
  let nextNodeID;
  for (let i = 0; i < nodeCollection.length; i++) {
    if (currentNode.id == nodeCollection[i].source) {
      if (nodeCollection[i].sourceHandle == String(path)) {
        if (nodeCollection[i].targetHandle && nodeCollection[i].targetHandle.split("_")[0] == "flow") {
          nextNodeID = nodeCollection[i].target;
          break;
        }
        else {
          return [false,"Wrong Connection"];
        }
      }
    }
  }
  for (let i = 0; i < nextNodeList.length; i++) {
    if (nextNodeID == nextNodeList[i].id) {
      return [true,nextNodeList[i]];
    }
  }

  return [true,false];
}



const determineType = (block, currentNode) => {
  switch (currentNode.type) {
    case "if":
    case "intialise":
    case "compare":
    case "while":
    case "for":
    case "num":
    case "math":
      block.name = currentNode.type;
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      block.type = "math";
      block.name = currentNode.type;
      break;
    case "greaterThan":
    case "lessThan":
    case "equals":
      block.type = "compare";
      block.name = currentNode.type;
      break;
    case "start":
    case "end":
      break;
    case "jump":
    case "duck":
    case "slide":
    case "attack":
    case "crouch":
    case "doubleJump":
      block.type = "move";
      block.name = currentNode.type;
      break;
    default:
      block.type = "specific";
      block.name = currentNode.type;
      break;
  }
  return block;
}



const FlowEditor = (props) => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [data, setData] = useState(initialData);

  const findInputs = (blocksOrder, currentNode, elements, val,level=0) => {
    const nodes = [currentNode];
    let edgeCollection = getConnectedEdges(nodes, elements);
    let prevNodeList = getIncomers(currentNode, elements);
    let IDlist = [];
    let inputs = [];
    if (level != 0) {
      let outName = null;
      let flowBlock = false;
      for (let i = 0; i < edgeCollection.length; i++) {
        if (currentNode.id == edgeCollection[i].source) {
          if (edgeCollection[i].sourceHandle && (edgeCollection[i].sourceHandle).split("_")[0] == "flow") {
            flowBlock = true;
          } else if (edgeCollection[i].sourceHandle && (edgeCollection[i].sourceHandle).split("_")[0] == "flow") {
            outName = blocksOrder[i].value[edgeCollection[i].sourceHandle];
          }
          if (flowBlock == true && outName) {
            break;
          }
        }
      }
      if (flowBlock) {
        for (let i = 0; i < blocksOrder.length; i++) {
          if (blocksOrder[i].id == currentNode.id) {
            return [blocksOrder, val, outName];
          }
        }
        return [null, null, null];
      }
    }
    for (let i = 0; i < edgeCollection.length; i++) {
      if (currentNode.id == edgeCollection[i].target) {
        if (edgeCollection[i].targetHandle&&(edgeCollection[i].targetHandle).split("_")[0] != "flow") {
          inputs.push(edgeCollection[i].targetHandle);
          for (let j = 0; j < prevNodeList.length; j++) {
            if (edgeCollection[i].source == prevNodeList[j].id) {
              IDlist.push(prevNodeList[j])
              break;
            }
          }
        }
      }
    }
    if (IDlist.length != inputs.length) {
      //console.log("gg",currentNode);
    }
    let block = {
      robot: "Arm",
      id: currentNode.id,
      type: currentNode.type,
      value: {...data[currentNode.id]},
    };
    block = determineType(block, currentNode);
    let output;
    for (let i = 0; i < IDlist.length; i++) {
      [blocksOrder, val, output] = (findInputs(blocksOrder, IDlist[i], elements, val, 1));
      if (blocksOrder || val || output) {
        block.value[inputs[i]] = output;
      }
      else {
        return [null,null,null];
      }
    }
    let edgeNum;
    for (let i = 0; i < edgeCollection.length; i++) {
      if (currentNode.id == edgeCollection[i].source) {
        if (edgeCollection[i].sourceHandle && (edgeCollection[i].sourceHandle).split("_")[0] != "flow") {
          edgeNum = i;
          break;
        }
      }
    }
    let outName = false;
    switch (currentNode.type) {
      case "num":
        outName = { ...data[currentNode.id] };
        outName = outName.value;
        break;
      case "intialise":
        let nextNodeID = edgeCollection[edgeNum].target;
        let nextNodeList = getOutgoers(currentNode, elements);
        let nextNode;
        for (let i = 0; i < nextNodeList.length; i++) {
          if (nextNodeID == nextNodeList[i].id) {
            nextNode = nextNodeList[i];
          }
        }
        if (nextNode.type == "var") {
          let value = { ...data[nextNode.id] };
          block.value[edgeCollection[edgeNum].sourceHandle] = value.varName
        }
        blocksOrder.push(block);
        break;
      default:
        if (edgeNum||edgeNum==0) {
          let NextOut = edgeCollection[edgeNum].sourceHandle;
          if (NextOut) {
            outName = "out_" + String(val);
            val++;
          }
          block.value[NextOut] = outName;
        }
        blocksOrder.push(block);
        break;
    }
    return [blocksOrder, val, outName];
  
    // return false;
  }


  useImperativeHandle(props.forwardedRef, () => ({
    getBlockConfig: () => {
      let blocksConfig = [];
      let currentNode = elements[0];
      let traverse = true;
      let val = 0;
      let path = [];
      let maxPath = [];
      let nodeContext=[];
      while (traverse) {
        if (currentNode) {
          let block = {
            robot: "Argm",
            value: { ...data[currentNode.id] },
            type: currentNode.type,
          };
          let f;
          [blocksConfig, val, f] = findInputs(blocksConfig, currentNode, elements, val);
          if (!(blocksConfig || val || f)) {
            return "wrong order";
          }
        }
        let nextNode;
        let edges = [];
        let nodes = [currentNode];
        let flowNext;
        switch (currentNode.type) {
          case "if":
            maxPath.push(2);
            path.push(0);
            nodeContext.push(currentNode);
            flowNext = "flow_" + String(path[path.length - 1]);
            break;
          case "while":
          case "for":
            maxPath.push(1);
            path.push(0);
            nodeContext.push(currentNode);
            flowNext = "flow_" + String(path[path.length - 1]);
            break;
          case undefined:
            let block = blocksConfig.pop();
            if (block.type != "else-condition") {
              blocksConfig.push(block);
            }
            break;
          default:
            flowNext = "flow";
            break;
        }
        if (flowNext) {
          let state;
          [state,nextNode] = findNextNode(currentNode, flowNext, elements);
          if (!state) {
            return nextNode;
          }
        }
        if (nextNode) {
          currentNode = nextNode;
        } else {
          if (path.length == 0) {
            traverse = false;
            break;
          } else {
            currentNode = nodeContext[path.length - 1];
            path[path.length - 1]++;
            let flowNext = "flow_" + String(path[path.length - 1]);
            let state;
            [state,nextNode] = findNextNode(currentNode, flowNext, elements);
            if (!state) {
              return nextNode;
            }
            let interBlock;
            if (path[path.length - 1] == maxPath[path.length - 1]) {
              path.pop();
              maxPath.pop();
              nodeContext.pop();
              interBlock = {
                type: "end-condition",
                name: "end-condition",
              };
            } else {
              switch (currentNode.type) {
                case "if":
                  if (path[path.length - 1] == 1) {
                    interBlock = {
                      type: "else-condition",
                      name: "else-condition",
                    };
                  }
                  break;
                default:
                  break;
              }
            }
            blocksConfig.push(interBlock);
            currentNode = nextNode;

          }
          
        }
      }
      

      if (blocksConfig[blocksConfig.length - 1].type !== "end") {
        return "disconnected";
      }
      console.log(blocksConfig);
      return blocksConfig;
    },
  }));

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
    const id = getId();
    let defaultValues = null;
    if (type === "gravity") {
      defaultValues = { isOn: true };
    } else if (type == "num") {
      defaultValues = { value: 0 };
    } else if (type == "var") {
      defaultValues = { varName: "varOut" };
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

  // const onEdgeUpdateStart = (event, edge) => {
  //   console.log(event);
  //   console.log(edge);
  // };

  // const onEdgeMouseLeave = (event, edge) => {
  //   console.log(event);
  //   console.log(edge);
  // };

  return (
    <div
      className={`${classes.editorContainer} ${
        props.mode === "testing" || props.mode === "verifying"
          ? classes.disable
          : ""
      }`}
      style={{ display: props.hide && "none" }}
    >
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
            deleteKeyCode={46}
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
