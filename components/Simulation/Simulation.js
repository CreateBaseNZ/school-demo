import { useCallback, useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import _, { debounce } from "lodash";

import classes from "./Simulation.module.scss";

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
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [isResizing, setIsResizing] = useState(false);

  // let throttled = false;

  // const resizeHandler = () => {
  //   if (!throttled) {
  //     setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //     throttled = true;
  //     setTimeout(() => {
  //       throttled = false;
  //     }, 1000);
  //   }
  // };

  const debouncedSizing = useCallback(
    debounce(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setIsResizing(false);
    }, 250),
    []
  );

  const resizeHandler = () => {
    setIsResizing(true);
    debouncedSizing();
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    // <div className={isResizing ? classes.resizing : ""}>
    //   <Unity
    //     unityContext={unityContext}
    //     style={{ height: height + "px", width: width + "px" }}
    //   />
    // </div>
    <div></div>
  );
};

export default Simulation;
