import { useContext } from "react";
import Image from "next/image";

import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

import FullscreenContext from "/store/fullscreen-context";

import classes from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const fullscreenCtx = useContext(FullscreenContext);

  const fullscreenHandler = () => {
    if (fullscreenCtx.isFullscreen) {
      fullscreenCtx.exitFullscreen();
    } else {
      fullscreenCtx.enterFullscreen();
    }
  };

  const fullScreenIcon = fullscreenCtx.isFullscreen ? (
    <FullscreenExitIcon style={{ fontSize: 22 }} />
  ) : (
    <FullscreenIcon style={{ fontSize: 22 }} />
  );

  return (
    <div className={classes.container}>
      <button title="Help">
        <HelpOutlineOutlinedIcon fontSize="small" />
      </button>
      <button title="Settings">
        <SettingsIcon fontSize="small" />
      </button>
      <button title="Feedback">
        <MarkunreadMailboxOutlinedIcon style={{ fontSize: 18 }} />
      </button>
      <button title="Fullscreen" onClick={fullscreenHandler}>
        {fullScreenIcon}
      </button>
      <a target="_blank" href="https://createbase.co.nz/">
        <Image
          src="/header-logo.png"
          width="138"
          height="25"
          alt="CreateBase"
        />
      </a>
    </div>
  );
};

export default HeaderButtons;
