import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";
import NavContext from "../../store/nav-context";
import capitalise from "../../utils/capitaliseString";

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
  const router = useRouter();
  const navCtx = useContext(NavContext);
  const [activeSubsystem, setActiveSubsystem] = useState();
  const [unityContext, sensorData, setSensorData, gameState, setGameState] =
    useUnity();

  const { asPath } = router;
  console.log(asPath);
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      setActiveSubsystem(strArr[2]);
      navCtx.setActiveSubsystem(capitalise(strArr[2]));
    } else {
      setActiveSubsystem("");
      navCtx.setActiveSubsystem("");
    }
  }, [asPath]);

  const clickHandler = () => {
    unityContext.send("SceneController", "LoadScene", "Training_Arm_0");
    // unityContext.send("SceneController", "ResetScene");
  };

  const getSubsystemIndex = () => {
    switch (activeSubsystem) {
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
        defaultSize={"20%"}
        onDragStarted={horizontalDragHandler}
        onDragFinished={dragReleaseHandler}
      >
        {/* <button onClick={clickHandler}>CLICK ME PLEASE</button> */}
        <Contents subsystemIndex={getSubsystemIndex()} />
        <Workspace unityContext={unityContext} sensorData={sensorData} />
      </SplitPane>
      <Simulation unityContext={unityContext} sensorData={sensorData} />
    </SplitPane>
  );
};

export default PlayInterface;
