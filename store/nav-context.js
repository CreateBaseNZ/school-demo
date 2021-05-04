import React, { useState, useEffect } from "react";

const NavContext = React.createContext({
  hasFocus: false,
  timeoutId: null,
  onClick: () => {},
  onBlur: () => {},
  onFocus: () => {},
});

export const NavContextProvider = (props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [timer, setTimer] = useState(null);

  const clickHandler = () => {
    console.log("clicked");
  };

  const blurHandler = () => {
    console.log("blurred");
    timer = setTimeout(() => {
      setHasFocus(false);
    });
  };

  const focusHandler = () => {
    console.log("focused");
    clearTimeout(timer);
  };

  return (
    <NavContext.Provider
      value={{
        hasFocus: hasFocus,
        timer: timer,
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
