import { useContext, useState } from "react";
import FeedbackModal from "/components/UI/FeedbackForm/FeedbackModal";

import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import WhiteLogo from "/components/UI/WhiteLogo";

import FullscreenContext from "/store/fullscreen-context";
import FeedbackContext from "/store/feedback-context";

import classes from "./HeaderButtons.module.scss";

const HeaderButtons = (props) => {
  const fullscreenCtx = useContext(FullscreenContext);
  const feedbackCtx = useContext(FeedbackContext);

  const {
    help = true,
    settings = true,
    feedback = true,
    fullscreen = true,
    logo = true,
    className = "",
  } = props;

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
    <div className={`${classes.container} ${className}`}>
      {help && (
        <button title="Help">
          <HelpOutlineOutlinedIcon fontSize="small" />
        </button>
      )}
      {settings && (
        <button title="Settings">
          <SettingsIcon fontSize="small" />
        </button>
      )}
      {feedback && (
        <button title="Feedback" onClick={feedbackCtx.showForm}>
          <MarkunreadMailboxOutlinedIcon style={{ fontSize: 18 }} />
        </button>
      )}
      {feedback && feedbackCtx.formVisible && <FeedbackModal />}
      {fullscreen && (
        <button
          title={fullscreenCtx.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={fullscreenHandler}
        >
          {fullScreenIcon}
        </button>
      )}
      {logo && <WhiteLogo width="138" height="25" />}
    </div>
  );
};

export default HeaderButtons;
