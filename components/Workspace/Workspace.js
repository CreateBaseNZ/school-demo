import dynamic from "next/dynamic";
import MonacoEditor from "../UI/MonacoEditor";

import blockConfigs from "../../public/data/blocksConfig.json";
import { CodeGenerator } from "./CodeGenerator.ts";

import classes from "./Workspace.module.scss";

let code = new CodeGenerator();
console.log(code.build(blockConfigs));

const FlowEditor = dynamic(() => import("../UI/FlowEditor/FlowEditor"), {
  ssr: false,
});

const Workspace = (props) => {
  return (
    <div className={classes.workspace}>
      {/* <MonacoEditor
        unityContext={props.unityContext}
        sensorData={props.sensorData}
      /> */}
      <FlowEditor />
    </div>
  );
};

export default Workspace;
