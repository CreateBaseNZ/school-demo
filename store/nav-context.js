import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const NavContext = createContext({
  navIsActive: false,
  activeType: null,
  activeStep: null,
  activeSubsystem: null,
  setActiveStep: () => {},
  setActiveSubsystem: () => {},
  onHover: () => {},
  onClick: () => {},
  onBlur: () => {},
  onFocus: () => {},
});

export const NavContextProvider = (props) => {
  const router = useRouter();

  const [navIsActive, setNavIsActive] = useState(false);
  const [activeType, setActiveType] = useState();
  const [activeStep, setActiveStep] = useState();
  const [activeSubsystem, setActiveSubsystem] = useState();

  const { asPath } = router;
  useEffect(() => {
    console.log(asPath);
    switch (asPath) {
      case "/menu":
        setActiveStep("Overview");
        setActiveSubsystem("");
        break;
      case "/menu/define":
        setActiveStep("Define");
        setActiveSubsystem("");
        break;
      case "/menu/plan":
        setActiveStep("Plan");
        setActiveSubsystem("");
        break;
      case "/menu/create":
        setActiveStep("Create");
        setActiveSubsystem("");
        break;
      case "/menu/Improve":
        setActiveStep("Improve");
        setActiveSubsystem("");
        break;
      case "/menu":
        setActiveStep("Overview");
        setActiveSubsystem("");
        break;
      case "/play":
        setActiveStep("improve");
        setActiveSubsystem("sandbox");
        break;
      case "/play/the-gravity-wand":
        setActiveStep("create");
        setActiveSubsystem("the-gravity-wand");
        break;
      case "/play/the-gravity-wand":
        setActiveStep("create");
        setActiveSubsystem("the-gravity-wand");
        break;
      case "/play/moving-the-arm":
        setActiveStep("create");
        setActiveSubsystem("moving-the-arm");
        break;
      case "/play/collecting-the-items":
        setActiveStep("create");
        setActiveSubsystem("collecting-the-items");
        break;
      default:
        setActiveStep("");
        setActiveSubsystem("");
        break;
    }
  }, [asPath]);

  let timer = null;

  const clickHandler = () => {
    setNavIsActive((currState) => !currState);
  };

  const blurHandler = () => {
    timer = setTimeout(() => {
      setNavIsActive(false);
    });
  };

  const focusHandler = () => {
    clearTimeout(timer);
  };

  const hoverHandler = (type) => {
    setActiveType(type);
  };

  const changeActiveStep = (step) => {
    setActiveStep(step);
  };

  const changeActiveSubsystem = (step) => {
    setActiveSubsystem(step);
  };

  return (
    <NavContext.Provider
      value={{
        navIsActive: navIsActive,
        activeType: activeType,
        activeStep: activeStep,
        activeSubsystem: activeSubsystem,
        setActiveStep: changeActiveStep,
        setActiveSubsystem: changeActiveSubsystem,
        onHover: hoverHandler,
        onClick: clickHandler,
        onBlur: blurHandler,
        onFocus: focusHandler,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
