import StartNode from "/components/Play/Workspace/FlowEditor/StartNode";
import EndNode from "/components/Play/Workspace/FlowEditor/EndNode";
import MoveNode from "/components/Play/Workspace/FlowEditor/MoveNode";
import ClawNode from "/components/Play/Workspace/FlowEditor/ClawNode";
import GravityNode from "/components/Play/Workspace/FlowEditor/GravityNode";
import ReadNode from "/components/Play/Workspace/FlowEditor/ReadNode";
import SetNode from "/components/Play/Workspace/FlowEditor/SetNode";
import PauseNode from "/components/Play/Workspace/FlowEditor/PauseNode";
import CustomEdge from "/components/Play/Workspace/FlowEditor/CustomEdge";
import IfNode from "../components/Play/Workspace/FlowEditor/IfNode";
import IntialiseNode from "../components/Play/Workspace/FlowEditor/IntialiseNode";
import CompareNode from "../components/Play/Workspace/FlowEditor/CompareNode";
import WhileNode from "../components/Play/Workspace/FlowEditor/WhileNode";
import ForNode from "../components/Play/Workspace/FlowEditor/ForNode";
import MathNode from "../components/Play/Workspace/FlowEditor/MathNode";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  gravity: GravityNode,
  read: ReadNode,
  set: SetNode,
  for: ForNode,
  math:MathNode,
  if: IfNode,
  intialise: IntialiseNode,
  compare: CompareNode,
  while:WhileNode,
  pause: PauseNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

export const miniMapStrokeColoriser = (node) => {
  switch (node.type) {
    case "move":
      return "#0a73dc";
    case "for":
      return "#0a73dc";
    case "while":
      return "#0a73dc";
    case "compare":
      return "#0a73dc";
    case "if":
      return "#0a73dc";
    case "intialise":
      return "#0a73dc";
    case "gravity":
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
