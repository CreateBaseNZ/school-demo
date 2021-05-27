import { memo } from "react";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

import classes from "./PlayButtons.module.scss";

export const PlayButton = (props) => {
  const clickHandler = () => {
    props.playHandler();
    props.clickHandler();
  };

  return (
    <button
      id="play-button"
      className={`${classes.button} ${classes.play}`}
      onClick={clickHandler}
      style={props.style}
      s
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
      onClick={props.onClick}
      style={props.style}
    >
      <StopRoundedIcon />
      Stop
    </button>
  );
};

const PlayButtons = (props) => {
  console.log(props.isPlaying);

  return (
    <div className={classes.container}>
      <PlayButton
        clickHandler={props.clickHandler}
        playHandler={props.playHandler}
        style={{ display: props.isPlaying ? "none" : "flex" }}
      />
      <StopButton
        onClick={props.clickHandler}
        style={{ display: props.isPlaying ? "flex" : "none" }}
      />
    </div>
  );
};

export default memo(PlayButtons);
