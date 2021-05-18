import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Simulation from "../Simulation/Simulation";
import StepCard from "../Menu/StepCard";
import DefineCard from "../Menu/DefineCard";
import PlanCard from "../Menu/PlanCard";
import CreateCard from "../Menu/CreateCard";

import classes from "./MenuInterface.module.scss";
import ImproveCard from "../Menu/ImproveCard";
import { Step } from "@material-ui/core";

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
  const [activeStep, setActiveStep] = useState();

  console.log(activeStep);

  const { asPath } = router;
  useEffect(() => {
    setActiveStep(asPath.substring(asPath.lastIndexOf("/") + 1));
  }, [asPath]);

  const cardClickHandler = (step) => {
    router.push("/menu", "/menu/" + step, { shallow: true });
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
                  activeStep === step.title.toLowerCase()
                    ? classes.activeStep
                    : ""
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
