import dynamic from "next/dynamic";
import MonacoEditor from "../UI/MonacoEditor";

import classes from "./Workspace.module.scss";

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
