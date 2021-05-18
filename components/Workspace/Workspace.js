import FlowEditor from "../UI/FlowEditor";
import MonacoEditor from "../UI/MonacoEditor";

import classes from "./Workspace.module.scss";

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
