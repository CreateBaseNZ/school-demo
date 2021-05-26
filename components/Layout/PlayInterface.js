import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";
import NavContext from "../../store/nav-context";
import capitalise from "../../utils/capitaliseString";

import Contents from "../Contents/Contents";
import Simulation from "../Simulation/Simulation";
import Workspace from "../Workspace/Workspace";
import PlayButtons from "../UI/PlayButtons";

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

const getSubsystemIndex = (subsystem) => {
  switch (subsystem) {
    case "moving-the-arm":
      return 0;
    case "operating-the-claw":
      return 1;
    case "collecting-the-items":
      return 2;
    default:
      return 0;
  }
};

const getSubsystemScene = (subsystem) => {
  switch (subsystem) {
    case "moving-the-arm":
      return "Training_Arm_0";
    case "operating-the-claw":
      return "Training_Arm_1";
    case "collecting-the-items":
      return "Project_Industrial_0";
    default:
      return "Project_Industrial_0";
  }
};

const PlayInterface = (props) => {
  const router = useRouter();
  const navCtx = useContext(NavContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unityContext, sensorData, setSensorData, gameState, setGameState] =
    useUnity(getSubsystemScene(props.subsystem));

  const { asPath } = router;
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      navCtx.setActiveSubsystem(capitalise(strArr[2]));
    } else {
      navCtx.setActiveSubsystem("");
    }
  }, [asPath]);

  const clickHandler = () => {
    setIsPlaying((current) => !current);
  };

  return (
    <>
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
          defaultSize={"20%"}
          onDragStarted={horizontalDragHandler}
          onDragFinished={dragReleaseHandler}
        >
          <Contents subsystemIndex={getSubsystemIndex(props.subsystem)} />
          <Workspace
            unityContext={unityContext}
            sensorData={sensorData}
            isPlaying={isPlaying}
            clickHandler={clickHandler}
          />
        </SplitPane>
        <Simulation unityContext={unityContext} sensorData={sensorData} />
      </SplitPane>
    </>
  );
};

export default PlayInterface;
