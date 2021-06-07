import { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";

import Contents from "../Play/Contents/Contents";
import Simulation from "../Play/Simulation/Simulation";
import Workspace from "../Play/Workspace/Workspace";
import SuccessModal from "../Play/SuccessModal";

import classes from "./PlayInterface.module.scss";

const verticalDragHandler = () => {
  document.body.style.cursor = "ew-resize";
};

const horizontalDragHandler = () => {
  document.body.style.cursor = "ns-resize";
};

const dragReleaseHandler = () => {
  document.body.style.cursor = "default";
};

const getSubsystemIndex = (subsystem) => {
  switch (subsystem) {
    case "the-gravity-wand":
      return 0;
    case "moving-the-arm":
      return 1;
    case "collecting-the-items":
      return 2;
    default:
      return 3;
  }
};

const getSubsystemScene = (subsystem) => {
  switch (subsystem) {
    case "the-gravity-wand":
      return "Training_Arm_1";
    case "moving-the-arm":
      return "Training_Arm_0";
    case "collecting-the-items":
      return "Project_Industrial_1";
    default:
      return "Project_Industrial_1";
  }
};

const PlayInterface = (props) => {
  const [mode, setMode] = useState("ready");
  // const [isTesting, setIsTesting] = useState(false);
  // const [isVerifying, setIsVerifying] = useState(false);
  const [unityContext, sensorData, gameState] = useUnity(
    getSubsystemScene(props.subsystem)
  );
  const [swiperHeight, setSwiperHeight] = useState();

  // subsystem change
  useEffect(() => {
    unityContext.send(
      "SceneController",
      "LoadScene",
      getSubsystemScene(props.subsystem)
    );
    setMode("loading");
    setTimeout(() => setMode("ready"), 5000);
    // setIsTesting(false);
    // setIsVerifying(false);
  }, [props.subsystem]);

  const testHandler = () => {
    // setIsTesting(true);
    setMode("testing");
  };

  const stopTestHandler = () => {
    // setIsTesting(false);
    setMode("loading");
    setTimeout(() => setMode("ready"), 5000);
    unityContext.send("SceneController", "ResetScene");
  };

  // called in the verify handler
  const verifyHandler = () => {
    // setIsVerifying(true);
    setMode("verifying");
  };

  // called in the cancel verify handler
  const cancelVerifyHandler = () => {
    // id: '#cancel-verify-button'
    // setIsVerifying(false);
    setMode("loading");
    setTimeout(() => setMode("ready"), 5000);
    unityContext.send("SceneController", "ResetScene");
  };

  // called in the restart subsystem handler
  const restartHandler = () => {
    // id: '#restart-button'
    // setIsVerifying(false);
    setMode("loading");
    setTimeout(() => setMode("ready"), 5000);
    unityContext.send("SceneController", "ResetScene");
  };

  const closeSuccessHandler = () => {
    // id: '#close-success-button'
    // setIsVerifying(false);
    setMode("loading");
    setTimeout(() => setMode("ready"), 5000);
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
          onChange={(size) => setSwiperHeight(size)}
          onDragFinished={dragReleaseHandler}
        >
          <Contents
            subsystemIndex={getSubsystemIndex(props.subsystem)}
            // isTesting={isTesting}
            // isVerifying={isVerifying}
            mode={mode}
            height={swiperHeight}
          />
          <Workspace
            unityContext={unityContext}
            sensorData={sensorData}
            gameState={gameState}
            // isTesting={isTesting}
            // isVerifying={isVerifying}
            mode={mode}
            testHandler={testHandler}
            stopTestHandler={stopTestHandler}
            verifyHandler={verifyHandler}
            cancelVerifyHandler={cancelVerifyHandler}
            restartHandler={restartHandler}
          />
        </SplitPane>
        <Simulation unityContext={unityContext} />
      </SplitPane>
      <div id="play-portal"></div>
      <SuccessModal
        style={{
          display:
            (props.mode !== "verifying" || gameState.toLowerCase() !== "win") &&
            "none",
        }}
        restartHandler={restartHandler}
        closeSuccessHandler={closeSuccessHandler}
      />
    </>
  );
};

export default PlayInterface;
