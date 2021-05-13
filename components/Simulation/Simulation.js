import Unity, { UnityContext } from "react-unity-webgl";

import classes from "./Simulation.module.scss";

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

const Simulation = (props) => {
  const focusHandler = () => {
    unityContext.send("GameController", "FocusCanvas", "1");
  };

  const blurHandler = () => {
    unityContext.send("GameController", "FocusCanvas", "0");
  };

  return (
    <div
      className={`${classes.simulationContainer} ${
        props.resizing ? classes.resizing : ""
      }`}
      onFocus={focusHandler}
      onBlur={blurHandler}
      tabIndex={1}
    >
      <div className={classes.simulationWrapper}>
        <Unity
          unityContext={unityContext}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
    // <div className={classes.simulation}></div>
  );
};

export default Simulation;
