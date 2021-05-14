import { useEffect, useState } from "react";
import Simulation from "../Simulation/Simulation";
import StepCard from "../UI/Menu/StepCard";

import classes from "./MenuInterface.module.scss";

const DUMMY_DATA = [
  {
    step: "Define",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    step: "Plan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    step: "Create",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    step: "Improve",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

const MenuInterface = () => {
  const [activeStep, setActiveStep] = useState(null);

  console.log(activeStep);

  const cardClickHandler = (step) => {
    setActiveStep(step);
  };

  return (
    <div
      className={`${classes.interface} ${
        activeStep ? classes.contentActive : ""
      }`}
    >
      <div className={classes.leftArea}>
        <div className={classes.stepContainer}>
          <h1>Project Steps</h1>
          {DUMMY_DATA.map((step, index) => {
            return (
              <StepCard
                className={`${classes.step} ${
                  activeStep === index + 1 ? classes.activeStep : ""
                }`}
                step={step.step}
                description={step.description}
                stepNumber={index + 1}
                key={step.step}
                onClick={() => cardClickHandler(index + 1)}
              />
            );
          })}
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.defineWrapper}>
            <h2>Define</h2>
          </div>
        </div>
      </div>
      <div className={classes.rightArea}>
        <Simulation className={classes.simulationContainer} />
      </div>
    </div>
  );
};

export default MenuInterface;
