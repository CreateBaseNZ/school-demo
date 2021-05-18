import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Simulation from "../Simulation/Simulation";
import StepCard from "../Menu/StepCard";
import DefineCard from "../Menu/DefineCard";
import PlanCard from "../Menu/PlanCard";
import CreateCard from "../Menu/CreateCard";

import classes from "./MenuInterface.module.scss";
import ImproveCard from "../Menu/ImproveCard";

const DUMMY_DATA = [
  {
    title: "Define",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    title: "Plan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    title: "Create",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    title: "Improve",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

const MenuInterface = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const { query } = router.query;
    console.log;
    setActiveStep(query);
  }, []);

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
          {DUMMY_DATA.map((step) => {
            return (
              <StepCard
                className={`${classes.step} ${
                  activeStep === step.title ? classes.activeStep : ""
                }`}
                step={step.title}
                description={step.description}
                key={step.title}
                onClick={() => cardClickHandler(step.title.toLowerCase())}
              />
            );
          })}
        </div>
        <div className={classes.contentContainer}>
          {activeStep === "define" && <DefineCard />}
          {activeStep === "plan" && <PlanCard />}
          {activeStep === "create" && <CreateCard />}
          {activeStep === "improve" && <ImproveCard />}
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
