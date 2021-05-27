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
    >
      <StopRoundedIcon />
      Stop
    </button>
  );
};

const PlayButtons = (props) => {
  return (
    <div className={classes.container}>
      <PlayButton
        clickHandler={props.clickHandler}
        playHandler={props.playHandler}
        style={{ visibility: props.isPlaying ? "hidden" : "visible" }}
      />
      <StopButton
        onClick={props.clickHandler}
        style={{ visibility: props.isPlaying ? "visible" : "hidden" }}
      />
    </div>
  );
};

export default memo(PlayButtons);
