import { memo } from "react";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

import classes from "./PlayButtons.module.scss";

export const TestButton = (props) => {
  return (
    <button
      id="test-button"
      className={`${classes.button} ${classes.test}`}
      onClick={props.testHandler}
      style={props.style}
    >
      <PlayCircleFilledRoundedIcon />
      Test
    </button>
  );
};

export const StopButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.stop} terminate-code`}
      onClick={props.stopTestHandler}
      style={props.style}
    >
      <StopRoundedIcon />
      Stop
    </button>
  );
};

const PlayButtons = (props) => {
  return (
    <div
      className={classes.container}
      style={{ display: props.mode === "verifying" && "none" }}
    >
      <TestButton
        testHandler={props.testHandler}
        style={{ display: props.mode !== "ready" && "none" }}
      />
      <StopButton
        stopTestHandler={props.stopTestHandler}
        style={{ display: props.mode !== "testing" && "none" }}
      />
    </div>
  );
};

export default memo(PlayButtons);
