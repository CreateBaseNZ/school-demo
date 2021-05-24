import StartNode from "../components/UI/FlowEditor/StartNode";
import EndNode from "../components/UI/FlowEditor/EndNode";
import MoveNode from "../components/UI/FlowEditor/MoveNode";
import ClawNode from "../components/UI/FlowEditor/ClawNode";
import ReadNode from "../components/UI/FlowEditor/ReadNode";
import SetNode from "../components/UI/FlowEditor/SetNode";
import PauseNode from "../components/UI/FlowEditor/PauseNode";
import CustomEdge from "../components/UI/FlowEditor/CustomEdge";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  claw: ClawNode,
  read: ReadNode,
  set: SetNode,
  pause: PauseNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

export const miniMapStrokeColoriser = (node) => {
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

export const miniMapColoriser = (node) => {
  return "none";
};
