import BugReportIcon from "@material-ui/icons/BugReport";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

import classes from "./Console.module.scss";

export const Log = (props) => {
  return <span>{props.message}</span>;
};

export const Error = (props) => {
  return (
    <span className={classes.error}>
      <BugReportIcon style={{ fontSize: 16 }} />
      {props.message}
    </span>
  );
};

export const Warning = (props) => {
  return (
    <span className={classes.warning}>
      <WarningRoundedIcon style={{ fontSize: 16 }} />
      {props.message}
    </span>
  );
};

const Console = (props) => {
  return (
    <div
      id="console"
      className={classes.console}
      style={{ display: props.hide && "none" }}
      onChange={() => console.log("this changed")}
    ></div>
  );
};

export default Console;
