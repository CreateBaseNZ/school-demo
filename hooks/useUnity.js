import { useCallback, useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/simulation/build.loader.js",
  dataUrl: "/simulation/build.data",
  frameworkUrl: "/simulation/build.framework.js",
  codeUrl: "/simulation/build.wasm",
  productName: "Simulation",
  productVersion: "0.1",
  companyName: "CreateBase",
  // streamingAssetsUrl: "StreamingAssets",
  // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
  // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
});

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

const useUnity = (subsystem) => {
  const [sensorData, setSensorData] = useState();
  const [gameState, setGameState] = useState();

  useEffect(() => {
    unityContext.on("GetSensorData", (sensorData) => {
      setSensorData(sensorData);
    });
  }, []);

  useEffect(() => {
    return () => unityContext.removeEventAllListeners();
  }, []);

  useEffect(() => {
    unityContext.on("GetGameState", (gameState) => {
      setGameState(gameState);
    });
  }, []);

  useEffect(() => {
    unityContext.on("loaded", () => {
      console.log();
      setTimeout(() => {
        unityContext.send(
          "SceneController",
          "LoadScene",
          getSubsystemScene(subsystem)
        );
      }, 4000);
    });
  }, [subsystem]);

  const changeScene = (subsystem) => {
    unityContext.send(
      "SceneController",
      "LoadScene",
      getSubsystemScene(subsystem)
    );
  };

  const resetScene = () => {
    unityContext.send("SceneController", "ResetScene");
  };

  return [unityContext, sensorData, gameState, changeScene, resetScene];
};

export default useUnity;
