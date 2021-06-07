import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import EllipsesLoading from "/components/UI/EllipsesLoading";

import classes from "./LastSlide.module.scss";

const LastSlide = (props) => {
  return (
    <div className={classes.lastSlideWrapper}>
      <button
        className={classes.verifyBtn}
        onClick={props.verifyHandler}
        style={{
          display: props.mode !== "ready" && "none",
        }}
      >
        <SlowMotionVideoIcon fontSize="large" />
        Verify my code!
      </button>
      <div
        className={classes.verifyingWrapper}
        style={{
          display: props.mode !== "verifying" && "none",
        }}
      >
        <span>VERIFYING</span>
        <EllipsesLoading />
        <button
          id="cancel-verify-button"
          className={classes.cancelBtn}
          onClick={props.cancelVerifyHandler}
        >
          <CloseRoundedIcon fontSize="small" />
          Cancel
        </button>
      </div>
      {props.mode === "testing" && (
        <div style={{ opacity: 0.75 }}>Simulation in progress...</div>
      )}
    </div>
  );
};

export default LastSlide;
