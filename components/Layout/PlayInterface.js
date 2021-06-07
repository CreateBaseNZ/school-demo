import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
    const date = new Date().toString();
    // Create Cookie for Clicking Test
    const cookieTest = {
      date,
      name: "Testing simulation",
      subsystem: props.subsystem,
    };
    // Create cookies
    const behaviours = [cookieTest];
    axios
      .post("/api/cookie/set", { date, behaviours })
      .then((response) => {
        if (response.data === "failed" || response.data === "error")
          console.log(response.data);
      })
      .catch((error) => console.log({ status: "error", content: error }));
    // Run Handlers
    setMode("testing");
    consoleLog("Starting test ...");
  };

  const stopTestHandler = () => {
    const date = new Date().toString();
    const progress = progressState
      ? Math.round(progressState * 10000) / 100
      : 0;
    const pair = uuidv4();
    // Create Cookie for Tracking Progress
    const cookieProgress = {
      date,
      progress,
      name: "Progress when stopped",
      pair,
      subsystem: props.subsystem,
    };
    // Create Cookie for Clicking Stop
    const cookieStop = {
      date,
      name: "Stopped simulation",
      pair,
      subsystem: props.subsystem,
    };
    // Create cookies
    const behaviours = [cookieProgress, cookieStop];
    axios
      .post("/api/cookie/set", { date, behaviours })
      .then((response) => {
        if (response.data === "failed" || response.data === "error")
          console.log(response.data);
      })
      .catch((error) => console.log({ status: "error", content: error }));
    // Run Handlers
    setMode("loading");
    setTimeout(() => setMode("ready"), 3500);
    resetScene();
    consoleLog("Testing complete");
  };

  // called in the verify handler
  const verifyHandler = () => {
    const date = new Date().toString();
    // Create Cookie for Clicking Verifify
    const cookieVerify = {
      date,
      name: "Verifying simulation",
      subsystem: props.subsystem,
    };
    // Create cookies
    const behaviours = [cookieVerify];
    axios
      .post("/api/cookie/set", { date, behaviours })
      .then((response) => {
        if (response.data === "failed" || response.data === "error")
          console.log(response.data);
      })
      .catch((error) => console.log({ status: "error", content: error }));
    setMode("verifying");
    consoleLog("Verifying ...");
  };

  // called in the cancel verify handler
  const cancelVerifyHandler = () => {
    const date = new Date().toString();
    const progress = progressState
      ? Math.round(progressState * 10000) / 100
      : 0;
    const pair = uuidv4();
    // Create Cookie for Tracking Progress
    const cookieProgress = {
      date,
      progress,
      name: "Progress when cancelled verification",
      pair,
      subsystem: props.subsystem,
    };
    // Create Cookie for Cancelling Verification
    const cookieCancelVerify = {
      date,
      name: "Cancelled verification",
      pair,
      subsystem: props.subsystem,
    };
    // Create cookies
    const behaviours = [cookieProgress, cookieCancelVerify];
    axios
      .post("/api/cookie/set", { date, behaviours })
      .then((response) => {
        if (response.data === "failed" || response.data === "error")
          console.log(response.data);
      })
      .catch((error) => console.log({ status: "error", content: error }));
    // Run Handlers
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
