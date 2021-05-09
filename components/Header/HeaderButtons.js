import { useContext } from "react";
import { useRouter } from "next/router";
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

  const fullscreenHandler = () => {
    if (fullscreenCtx.isFullscreen) {
      fullscreenCtx.exitFullscreen();
    } else {
      fullscreenCtx.enterFullscreen();
    }
  };

  const fullscreenIcon = fullscreenCtx.isFullscreen ? (
    <FullscreenExitIcon style={{ fontSize: 22 }} />
  ) : (
    <FullscreenIcon style={{ fontSize: 22 }} />
  );

  const buttons = [
    {
      title: "Help",
      show: props.showHelp,
      icon: <HelpOutlineOutlinedIcon fontSize="small" />,
      clickHandler: () => {},
    },
    {
      title: "Settings",
      show: props.showSettings,
      icon: <SettingsIcon fontSize="small" />,
      clickHandler: () => {},
    },
    {
      title: "Feedback",
      show: props.showFeedback,
      icon: <MarkunreadMailboxOutlinedIcon style={{ fontSize: 18 }} />,
      clickHandler: feedbackCtx.showForm,
    },
    {
      title: fullscreenCtx.isFullscreen ? "Exit fullscreen" : "Fullscreen",
      show: props.showFullscreen,
      icon: fullscreenIcon,
      clickHandler: fullscreenHandler,
    },
  ];

  return (
    <div className={classes.container}>
      {buttons.map((btn) => (
        <button
          key={btn.title}
          title={btn.title}
          className={btn.show ? "" : classes.hide}
          onClick={btn.clickHandler}
        >
          {btn.icon}
        </button>
      ))}
      <WhiteLogo
        className={props.showLogo ? "" : classes.hide}
        width="138"
        height="25"
      />
      {props.showFeedback && feedbackCtx.formVisible && <FeedbackModal />}
    </div>
  );
};

export default HeaderButtons;
