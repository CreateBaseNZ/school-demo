import { useState, useCallback, useEffect } from "react";
import SplitPane from "react-split-pane";

import _, { debounce } from "lodash";

import Contents from "../Contents/Contents";
import Simulation from "../Simulation/Simulation";
import Workspace from "../Workspace/Workspace";

import classes from "./PlayInterface.module.scss";

const PlayInterface = () => {
  const [isResizing, setIsResizing] = useState(false);

  const debouncedSizing = useCallback(
    debounce(() => {
      setIsResizing(false);
    }, 500),
    []
  );

  const simulationResizeHandler = () => {
    setIsResizing(true);
    debouncedSizing();
  };

  useEffect(() => {
    window.addEventListener("resize", simulationResizeHandler);
  }, []);

  return (
    <SplitPane
      className={classes.splitVertical}
      split="vertical"
      defaultSize={"50%"}
      primary={"second"}
      onChange={simulationResizeHandler}
    >
      <Simulation resizing={isResizing} />
      <SplitPane
        split="horizontal"
        className={classes.splitHorizontal}
        defaultSize={"25%"}
      >
        <Contents />
        <Workspace />
      </SplitPane>
    </SplitPane>
  );
};

export default PlayInterface;
