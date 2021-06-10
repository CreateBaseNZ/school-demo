import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";
import consoleLog from "/utils/consoleLog";

import Contents from "../Play/Contents/Contents";
import Simulation from "../Play/Simulation/Simulation";
import Workspace from "../Play/Workspace/Workspace";
import SuccessModal from "../Play/SuccessModal";

import classes from "./PlayInterface.module.scss";
import { useMediaQuery } from "@material-ui/core";

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

const PlayInterface = (props) => {
  const [mode, setMode] = useState("ready");
  const [
    unityContext,
    sensorData,
    gameState,
    changeScene,
    resetScene,
    progressState,
  ] = useUnity(props.subsystem);
  const [swiperHeight, setSwiperHeight] = useState();
  const [simulationWidth, setSimulationWidth] = useState();

  useEffect(() => {
    if (
      gameState &&
      mode === "verifying" &&
      gameState.toLowerCase() === "win"
    ) {
      localStorage.setItem(props.subsystem, "completed");
    }
  }, [gameState]);

  // subsystem change
  useEffect(() => {
    changeScene(props.subsystem);
    setMode("loading");
    setTimeout(() => setMode("ready"), 3500);
  }, [props.subsystem]);

  const simulationResizeHandler = (arg) => {
    setSimulationWidth(window.innerWidth - arg);
  };

  const debouncedResizeHandler = useMemo(
    () => debounce(simulationResizeHandler, 300),
    []
  );

  useEffect(() => {
    return () => debouncedResizeHandler.cancel();
  }, []);

  const testHandler = () => {
    setMode("testing");
    consoleLog("Starting test ...");
  };

  const stopTestHandler = () => {
    setMode("loading");
    setTimeout(() => setMode("ready"), 3500);
    resetScene();
    consoleLog("Testing complete");
  };

  // called in the verify handler
  const verifyHandler = () => {
    setMode("verifying");
    consoleLog("Verifying ...");
  };

  // called in the cancel verify handler
  const cancelVerifyHandler = () => {
    setMode("loading");
    consoleLog("Verification cancelled");
    setTimeout(() => setMode("ready"), 3500);
    resetScene();
  };

  // called in the restart subsystem handler
  const restartHandler = () => {
    setMode("loading");
    setTimeout(() => setMode("ready"), 3500);
    resetScene();
  };

  const closeSuccessHandler = () => {
    setMode("loading");
    setTimeout(() => setMode("ready"), 3500);
  };

  return (
    <>
      <SplitPane
        className={classes.splitVertical}
        split="vertical"
        defaultSize={"50%"}
        onDragStarted={verticalDragHandler}
        onChange={debouncedResizeHandler}
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
            mode={mode}
            height={swiperHeight}
          />
          <Workspace
            unityContext={unityContext}
            sensorData={sensorData}
            gameState={gameState}
            progressState={progressState}
            mode={mode}
            testHandler={testHandler}
            stopTestHandler={stopTestHandler}
            verifyHandler={verifyHandler}
            cancelVerifyHandler={cancelVerifyHandler}
            restartHandler={restartHandler}
            subsystem={props.subsystem}
          />
        </SplitPane>
        <Simulation unityContext={unityContext} width={simulationWidth} />
      </SplitPane>
      <div id="play-portal"></div>
      <SuccessModal
        style={{
          display:
            (mode !== "verifying" || gameState.toLowerCase() !== "win") &&
            "none",
        }}
        restartHandler={restartHandler}
        closeSuccessHandler={closeSuccessHandler}
      />
    </>
  );
};

export default PlayInterface;
