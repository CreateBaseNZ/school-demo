import React, { useState, useEffect } from "react";

const NavContext = React.createContext({
  isActive: false,
  onClick: () => {},
  onBlur: () => {},
  onFocus: () => {},
});

export const NavContextProvider = (props) => {
  const [isActive, setIsActive] = useState(false);

  let timer = null;

  const clickHandler = () => {
    console.log("clicked");
    setIsActive((currState) => !currState);
  };

  const blurHandler = () => {
    console.log("blurred");
    timer = setTimeout(() => {
      setIsActive(false);
    });
  };

  const focusHandler = () => {
    console.log("focused");
    clearTimeout(timer);
  };

  return (
    <NavContext.Provider
      value={{
        isActive: isActive,
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
