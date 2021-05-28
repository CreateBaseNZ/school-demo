import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import SplitPane from "react-split-pane";
import useUnity from "../../hooks/useUnity";
import NavContext from "../../store/nav-context";
import capitalise from "../../utils/capitaliseString";

import Contents from "../Play/Contents/Contents";
import Simulation from "../Play/Simulation/Simulation";
import Workspace from "../Play/Workspace/Workspace";
import SuccessModal from "../Play/SuccessModal";

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
  const [isVerifying, setIsVerifying] = useState(false);
  const [unityContext, sensorData, gameState] = useUnity(
    getSubsystemScene(props.subsystem)
  );

  // setting the nav
  const { asPath } = router;
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      navCtx.setActiveSubsystem(capitalise(strArr[2]));
    } else {
      navCtx.setActiveSubsystem("");
    }
  }, [asPath]);

  useEffect(() => {
    console.log(isVerifying);
    console.log(gameState);
  }, [isVerifying, gameState]);

  const playHandler = () => {
    setIsPlaying(true);
  };

  const stopHandler = () => {
    setIsPlaying(false);
    unityContext.send("SceneController", "ResetScene");
  };

  // called in the verify handler
  const verifyHandler = () => {
    setIsVerifying(true);
  };

  // called in the cancel verify handler
  const cancelVerifyHandler = () => {
    // id: '#cancel-verify-button'
    setIsVerifying(false);
    unityContext.send("SceneController", "ResetScene");
  };

  // called in the restart subsystem handler
  const restartHandler = () => {
    // id: '#restart-button'
    setIsVerifying(false);
    unityContext.send("SceneController", "ResetScene");
  };

  const closeSuccessHandler = () => {
    // id: '#close-success-button'
    setIsVerifying(false);
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
          <Contents
            subsystemIndex={getSubsystemIndex(props.subsystem)}
            isPlaying={isPlaying}
            isVerifying={isVerifying}
          />
          <Workspace
            unityContext={unityContext}
            sensorData={sensorData}
            gameState={gameState}
            isPlaying={isPlaying}
            isVerifying={isVerifying}
            playHandler={playHandler}
            stopHandler={stopHandler}
            verifyHandler={verifyHandler}
            cancelVerifyHandler={cancelVerifyHandler}
            restartHandler={restartHandler}
          />
        </SplitPane>
        <Simulation unityContext={unityContext} sensorData={sensorData} />
      </SplitPane>
      <div id="play-portal"></div>
      <SuccessModal
        style={{
          display:
            (!isVerifying || gameState.toLowerCase() !== "win") && "none",
        }}
        restartHandler={restartHandler}
        closeSuccessHandler={closeSuccessHandler}
      />
    </>
  );
};

export default PlayInterface;
