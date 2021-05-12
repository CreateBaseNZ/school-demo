import { useCallback, useEffect, useState } from "react";
import useFocus from "../../hooks/useFocus";
import Unity, { UnityContext } from "react-unity-webgl";

import _, { debounce } from "lodash";

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
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [isResizing, setIsResizing] = useState(false);

  const debouncedSizing = useCallback(
    debounce(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setIsResizing(false);
    }, 250),
    []
  );

  const simulationResizeHandler = () => {
    setIsResizing(true);
    debouncedSizing();
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    window.addEventListener("resize", simulationResizeHandler);
  }, []);

  const focusHandler = () => {
    unityContext.send("GameController", "FocusCanvas", "1");
  };

  const blurHandler = () => {
    unityContext.send("GameController", "FocusCanvas", "0");
  };

  return (
    <div
      className={isResizing ? classes.resizing : ""}
      onFocus={focusHandler}
      onBlur={blurHandler}
      tabIndex={1}
    >
      <Unity
        unityContext={unityContext}
        style={{ height: height + "px", width: width + "px" }}
      />
    </div>
  );
};

export default Simulation;
