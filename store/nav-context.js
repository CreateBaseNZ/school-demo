import React, { useState, createContext } from "react";

const NavContext = createContext({
  navIsActive: false,
  activeType: null,
  onHover: () => {},
  onClick: () => {},
  onBlur: () => {},
  onFocus: () => {},
});

export const NavContextProvider = (props) => {
  const [navIsActive, setNavIsActive] = useState(false);
  const [activeType, setActiveType] = useState();

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

  return (
    <NavContext.Provider
      value={{
        navIsActive: navIsActive,
        activeType: activeType,
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
