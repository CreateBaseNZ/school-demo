import { useState, useEffect, createContext } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export const unityContext = new UnityContext({
  loaderUrl: "simulation/build.loader.js",
  dataUrl: "simulation/build.data",
  frameworkUrl: "simulation/build.framework.js",
  codeUrl: "simulation/build.wasm",
  productName: "Simulation",
  productVersion: "0.1",
  companyName: "CreateBase",
  // streamingAssetsUrl: "StreamingAssets",
  // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
  // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
});

const SimulationContext = createContext({
  sensorData: null,
  setSensorDataWrapper: () => {},
});

export const SimulationContextProvider = (props) => {
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    unityContext.on("GetSensorData", (sensorData) => {
      setSensorData(sensorData);
    });
  }, []);

  const setSensorDataWrapper = (data) => {
    setSensorData(data);
  };

  return (
    <SimulationContext.Provider
      value={{
        sensorData: sensorData,
        setSensorData: setSensorDataWrapper,
      }}
    >
      {props.children}
    </SimulationContext.Provider>
  );
};

export default SimulationContext;
