import { memo } from "react";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

import tracker from "/utils/tracker";
import { v4 as uuidv4 } from "uuid";

import classes from "./PlayButtons.module.scss";

export const TestButton = (props) => {
  const testHandler = () => {
    // Existing handlers
    props.testHandler();
    // Tracker
    const properties = { project: props.project, subsystem: props.subsystem };
    tracker.click(2, properties);
  }

  return (
    <button
      id="test-button"
      className={`${classes.button} ${classes.test}`}
      onClick={testHandler}
      style={props.style}
      title="Test"
    >
      <PlayCircleFilledRoundedIcon />
      Test
    </button>
  );
};

export const StopButton = (props) => {
  const stopHandler = async () => {
    // Existing handler
    props.stopTestHandler();
    // Tracker
    const pair = uuidv4();
    const progress = props.progressState ? Math.round(props.progressState * 10000) / 100 : 0;
    const properties = new Object({ project: props.project, subsystem: props.subsystem, pair, progress });
    try {
      await tracker.click(1, properties);
    } catch (data) {
      console.log(data);
    }
    try {
      await tracker.click(3, properties);
    } catch (data) {
      console.log(data);
    }
  }

  return (
    <button
      className={`${classes.button} ${classes.stop} terminate-code`}
      onClick={stopHandler}
      style={props.style}
      title="Stop"
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
        subsystem={props.subsystem}
      />
      <StopButton
        stopTestHandler={props.stopTestHandler}
        style={{ display: props.mode !== "testing" && "none" }}
        subsystem={props.subsystem}
        progressState={props.progressState}
      />
    </div>
  );
};

export default memo(PlayButtons);
