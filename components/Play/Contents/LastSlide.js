import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import EllipsesLoading from "/components/UI/EllipsesLoading";

import { v4 as uuidv4 } from "uuid";
import tracker from "/utils/tracker";

import classes from "./LastSlide.module.scss";

const LastSlide = (props) => {
  const verifyHandler = () => {
    // Existing handler
    props.verifyHandler();
    // Tracker
    const properties = { project: props.project, subsystem: props.subsystem };
    tracker.click(4, properties);
  }

  const cancelHandler = async () => {
    // Existing handler
    props.cancelVerifyHandler();
    // Tracker
    const pair = uuidv4();
    const progress = props.progressState ? Math.round(props.progressState * 10000) / 100 : 0;
    const properties = new Object({ project: props.project, subsystem: props.subsystem, pair, progress });
    try {
      await tracker.click(5, properties);
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
    <div className={classes.lastSlideWrapper}>
      <button
        className={classes.verifyBtn}
        onClick={verifyHandler}
        style={{
          display: props.mode !== "ready" && "none",
        }}
        title="Verify"
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
          className={`${classes.cancelBtn} terminate-code`}
          onClick={cancelHandler}
          title="Cancel"
        >
          <CloseRoundedIcon fontSize="small" />
          Cancel
        </button>
      </div>
      {props.mode === "testing" && (
        <div style={{ opacity: 0.75 }}>
          Simulation in progress. You must stop the current simulation before
          verifying.
        </div>
      )}
    </div>
  );
};

export default LastSlide;
