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
    const strArr = asPath.split("/");
    if (strArr.length > 1) {
      if (strArr[1] === "play") {
        setActiveStep("Create");
      } else if (strArr[1] === "menu") {
        setActiveStep("Overview");
      } else {
        setActiveStep(strArr[1]);
      }
    } else {
      setActiveStep("");
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
