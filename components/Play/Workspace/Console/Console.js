import BugReportIcon from "@material-ui/icons/BugReport";

import classes from "./Console.module.scss";

const Console = (props) => {
  return (
    <div
      id="console"
      className={classes.console}
      style={{ display: props.hide && "none" }}
    >
      <span className={classes.error}>
        <BugReportIcon fontSize="small" />
        Error code blah blah blah 404 something something Error code blah blah
        blah 404 something something Error code blah blah blah 404 something
        something Error code blah blah blah 404 something something
      </span>
      <span>Hello, world</span>
    </div>
  );
};

export default Console;
