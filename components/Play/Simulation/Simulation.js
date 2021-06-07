import Unity from "react-unity-webgl";

import classes from "./Simulation.module.scss";

const Simulation = (props) => {
  const focusHandler = () => {
    props.unityContext.send("GameController", "FocusCanvas", "1");
  };

  const blurHandler = () => {
    props.unityContext.send("GameController", "FocusCanvas", "0");
  };

  return (
    <div
      className={classes.simulationContainer}
      onFocus={focusHandler}
      onBlur={blurHandler}
      tabIndex={1}
    >
      <div className={classes.simulationWrapper}>
        <Unity
          unityContext={props.unityContext}
          style={{ height: "100%", width: props.width || "100%" }}
        />
      </div>
    </div>
  );
};

export default Simulation;
