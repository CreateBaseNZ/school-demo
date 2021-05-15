import { useContext, useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import SimulationContext, {
  unityContext,
} from "../../store/simulation-context";

import classes from "./Simulation.module.scss";

const Simulation = (props) => {
  const ctx = useContext(SimulationContext);

  const focusHandler = () => {
    unityContext.send("GameController", "FocusCanvas", "1");
  };

  const blurHandler = () => {
    unityContext.send("GameController", "FocusCanvas", "0");
  };

  return (
    <div
      className={`${props.className} ${classes.simulationContainer}`}
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
  );
};

export default Simulation;
