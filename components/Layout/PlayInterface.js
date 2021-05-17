import { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";

import Contents from "../Contents/Contents";
import Simulation from "../Simulation/Simulation";
import Workspace from "../Workspace/Workspace";

import classes from "./PlayInterface.module.scss";

const verticalDragHandler = () => {
  document.body.style.cursor = "ew-resize";
};

const horizontalDragHandler = () => {
  document.body.style.cursor = "ew-resize";
};

const dragReleaseHandler = () => {
  document.body.style.cursor = "default";
};

const PlayInterface = (props) => {
  const [unityContext, sensorData, setSensorDataWrapper] = useUnity();

  return (
    <SplitPane
      className={classes.splitVertical}
      split="vertical"
      defaultSize={"50%"}
      onDragStarted={verticalDragHandler}
      onDragFinished={dragReleaseHandler}
    >
      <SplitPane
        split="horizontal"
        className={classes.splitHorizontal}
        defaultSize={"25%"}
        onDragStarted={horizontalDragHandler}
        onDragFinished={dragReleaseHandler}
      >
        <Contents />
        <Workspace unityContext={unityContext} />
      </SplitPane>
      <Simulation unityContext={unityContext} />
    </SplitPane>
  );
};

export default PlayInterface;
