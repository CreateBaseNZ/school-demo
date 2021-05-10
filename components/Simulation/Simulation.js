import { useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
// import createUnityInstance from "../../build/build.loader";

const unityContext = new UnityContext({
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

const content = (
  <Unity
    unityContext={unityContext}
    style={{ height: "100%", width: "100%" }}
  />
);

const Simulation = (props) => {
  return <div></div>;
};

export default Simulation;
