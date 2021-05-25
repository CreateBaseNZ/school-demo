import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavContext from "../../store/nav-context";
import capitalise from "../../utils/capitaliseString";

import StepCard from "../Menu/StepCard";
import DefineCard from "../Menu/DefineCard";
import PlanCard from "../Menu/PlanCard";
import CreateCard from "../Menu/CreateCard";
import ImproveCard from "../Menu/ImproveCard";

import classes from "./MenuInterface.module.scss";

const DUMMY_DATA = [
  {
    title: "Define",
    description:
      "After experiencing the situation, clearly define a problem statement and determine the requirements of a successful solution",
  },
  {
    title: "Plan",
    description:
      "Create a plan for solving the problem by breaking down a proposed solution into a series of simpler subsystems",
  },
  {
    title: "Create",
    description:
      "Implement each subsystem, then bring your new knowledge together to program and test a final solution",
  },
  {
    title: "Improve",
    description:
      "Challenge yourself in this optional step, where we introduce new requirements that will require a more advanced solution",
  },
];

const MenuInterface = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState();
  const navCtx = useContext(NavContext);

  const { asPath } = router;
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      setActiveStep(strArr[2]);
      navCtx.setActiveStep(capitalise(strArr[2]));
    } else {
      setActiveStep("");
      navCtx.setActiveStep("");
    }
  }, [asPath]);

  const cardClickHandler = (step) => {
    router.push("/menu", "/menu/" + step, { shallow: true });
    navCtx.setActiveStep(capitalise(step));
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
