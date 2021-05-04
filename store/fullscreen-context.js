import { createContext, useState } from "react";

const FullscreenContext = createContext({
  isFullscreen: false,
  enterFullScreen: () => {},
  exitFullScreen: () => {},
  resizeHandler: () => {},
});

export const FullscreenContextProvider = (props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    const target = document.documentElement;
    if (target.requestFullscreen) {
      target.requestFullscreen();
    } else if (target.webkitRequestFullscreen) {
      target.webkitRequestFullscreen();
    } else if (target.mozRequestFullScreen) {
      target.mozRequestFullScreen();
    } else if (target.msRequestFullscreen) {
      target.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitexitFullscreen) {
      document.webkitexitFullscreen();
    } else if (document.mozexitFullscreen) {
      document.mozexitFullscreen();
    } else if (document.msexitFullscreen) {
      document.msexitFullscreen();
    }
  };

  const resizeHandler = () => {
    if (
      window.innerHeight === screen.height &&
      window.innerWidth === screen.width
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen: isFullscreen,
        enterFullscreen: enterFullscreen,
        exitFullscreen: exitFullscreen,
        resizeHandler: resizeHandler,
      }}
    >
      {props.children}
    </FullscreenContext.Provider>
  );
};

export default FullscreenContext;
