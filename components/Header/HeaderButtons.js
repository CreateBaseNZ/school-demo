import { useContext, useState } from "react";
import FeedbackModal from "/components/UI/FeedbackModal";

import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import WhiteLogo from "/components/UI/WhiteLogo";

import FullscreenContext from "/store/fullscreen-context";
import FeedbackContext from "/store/feedback-context";

import classes from "./HeaderButtons.module.scss";

const HeaderButtons = () => {
  const fullscreenCtx = useContext(FullscreenContext);
  const feedbackCtx = useContext(FeedbackContext);

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
      <button title="Feedback" onClick={feedbackCtx.showForm}>
        <MarkunreadMailboxOutlinedIcon style={{ fontSize: 18 }} />
      </button>
      {feedbackCtx.formVisible && <FeedbackModal />}
      <button
        title={fullscreenCtx.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        onClick={fullscreenHandler}
      >
        {fullScreenIcon}
      </button>
      <WhiteLogo width="138" height="25" />
    </div>
  );
};

export default HeaderButtons;
