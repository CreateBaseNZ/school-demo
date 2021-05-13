import { useState } from "react";
import Simulation from "../Simulation/Simulation";

import classes from "./MenuInterface.module.scss";

const MenuInterface = () => {
  const [activeStep, setActiveStep] = useState(null);

  console.log(activeStep);

  return (
    <div className={classes.interface}>
      <div
        className={`${classes.stepContainer} ${
          activeStep ? classes.collapse : ""
        }`}
      >
        <h1>Project Steps</h1>
        <div className={classes.step} onClick={() => setActiveStep(0)}>
          <h2>Define</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className={classes.step} onClick={() => setActiveStep(1)}>
          <h2>Plan</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className={classes.step} onClick={() => setActiveStep(2)}>
          <h2>Create</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className={classes.step} onClick={() => setActiveStep(3)}>
          <h2>Improve</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className={classes.simulation}>
        <Simulation className={classes.simulation} />
      </div>
    </div>
  );
};

export default MenuInterface;
