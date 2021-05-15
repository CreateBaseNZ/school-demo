import { useEffect, useState } from "react";
import Simulation from "../Simulation/Simulation";
import StepCard from "../Menu/StepCard";
import DefineCard from "../Menu/DefineCard";
import PlanCard from "../Menu/PlanCard";
import CreateCard from "../Menu/CreateCard";

import classes from "./MenuInterface.module.scss";
import ImproveCard from "../Menu/ImproveCard";

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
          {activeStep === 1 && <DefineCard />}
          {activeStep === 2 && <PlanCard />}
          {activeStep === 3 && <CreateCard />}
          {activeStep === 4 && <ImproveCard />}
        </div>
      </div>
      <div className={classes.rightArea}>
        {/* <Simulation className={classes.simulationContainer} /> */}
        <div></div>
      </div>
    </div>
  );
};

export default MenuInterface;
