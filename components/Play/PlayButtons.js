import { memo } from "react";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

import classes from "./PlayButtons.module.scss";

export const PlayButton = (props) => {
  return (
    <button
      id="play-button"
      className={`${classes.button} ${classes.play}`}
      onClick={props.playHandler}
      style={props.style}
    >
      <PlayCircleFilledRoundedIcon />
      Play
    </button>
  );
};

export const StopButton = (props) => {
  return (
    <button
      id="stop-button"
      className={`${classes.button} ${classes.stop}`}
      onClick={props.stopPlayHandler}
      style={props.style}
    >
      <StopRoundedIcon />
      Stop
    </button>
  );
};

const PlayButtons = (props) => {
  return (
    <div className={classes.container} style={props.style}>
      <PlayButton
        playHandler={props.playHandler}
        style={{ display: props.isPlaying && "none" }}
      />
      <StopButton
        stopPlayHandler={props.stopPlayHandler}
        style={{ display: !props.isPlaying && "none" }}
      />
    </div>
  );
};

export default memo(PlayButtons);
