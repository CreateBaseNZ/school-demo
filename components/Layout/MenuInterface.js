import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavContext from "../../store/nav-context";

import StepCard from "../Menu/StepCard";
import DefineCard from "../Menu/DefineCard";
import PlanCard from "../Menu/PlanCard";
import CreateCard from "../Menu/CreateCard";
import ImproveCard from "../Menu/ImproveCard";

import classes from "./MenuInterface.module.scss";

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

const capitalise = (str) => {
  const splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

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
