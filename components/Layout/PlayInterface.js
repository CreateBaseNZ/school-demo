import SplitPane from "react-split-pane";

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

const PlayInterface = () => {
  return (
    <SplitPane
      className={classes.splitVertical}
      split="vertical"
      defaultSize={"50%"}
      primary={"second"}
      onDragStarted={verticalDragHandler}
      onDragFinished={dragReleaseHandler}
    >
      <Simulation />
      <SplitPane
        split="horizontal"
        className={classes.splitHorizontal}
        defaultSize={"25%"}
        onDragStarted={horizontalDragHandler}
        onDragFinished={dragReleaseHandler}
      >
        <Contents />
        <Workspace />
      </SplitPane>
    </SplitPane>
  );
};

export default PlayInterface;
