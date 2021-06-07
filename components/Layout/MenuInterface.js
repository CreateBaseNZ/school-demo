import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavContext from "/store/nav-context";

import StepCard from "/components/Menu/StepCard";
import DefineCard from "/components/Menu/DefineCard";
import PlanCard from "/components/Menu/PlanCard";
import CreateCard from "/components/Menu/CreateCard";
import ImproveCard from "/components/Menu/ImproveCard";

import classes from "./MenuInterface.module.scss";

const DUMMY_DATA = [
  {
    title: "Define",
    description:
      "Clearly define a problem statement and determine the requirements of a successful solution",
    img: {
      src: "/define.jpg",
      alt: "Define",
    },
    number: "1",
  },
  {
    title: "Plan",
    description:
      "Create a plan for solving the problem by breaking down a proposed solution into a series of simpler subsystems",
    img: {
      src: "/plan.jpg",
      alt: "Define",
    },
    number: "2",
  },
  {
    title: "Create",
    description:
      "Implement each subsystem, then bring your new knowledge together to program and test a final solution",
    img: {
      src: "/create.jpg",
      alt: "Define",
    },
    number: "3",
  },
  {
    title: "Improve",
    description:
      "Challenge yourself in this optional step, where new requirements will require a more advanced solution",
    img: {
      src: "/improve.jpg",
      alt: "Define",
    },
    number: "4",
  },
];

const MenuInterface = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState();

  const { asPath } = router;
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      setActiveStep(strArr[2]);
    } else {
      setActiveStep("");
    }
  }, [asPath]);

  const cardClickHandler = (step) => {
    router.push("/menu/" + step, "/menu/" + step, { shallow: true });
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
                step={step.number + ": " + step.title}
                description={step.description}
                key={step.title}
                img={step.img}
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
        <video width="100%" height="100%" controls>
          <source src="/situation.mp4" type="video/mp4" />
          <source src="/situation.ogg" type="video/ogg" />
        </video>
      </div>
    </div>
  );
};

export default MenuInterface;
