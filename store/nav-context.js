import React, { useState, createContext } from "react";

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
  const [navIsActive, setNavIsActive] = useState(false);
  const [activeType, setActiveType] = useState();
  const [activeStep, setActiveStep] = useState();
  const [activeSubsystem, setActiveSubsystem] = useState();

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
