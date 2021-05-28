import BugReportIcon from "@material-ui/icons/BugReport";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

import classes from "./Console.module.scss";

const DUMMY_DATA = [
  {
    id: "1234",
    type: "error",
    message: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT",
  },
  {
    id: "1235",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "123123",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "12312345",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "12341234345",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "12323423ryt5",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "123hdsf5",
    type: "log",
    message: "Hello, world >=",
  },
  {
    id: "123twert5",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "123fgdh5",
    type: "log",
    message: "Hello, world",
  },
  {
    id: "12sdfa3fgdh5",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "123fg7653dh5",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
];

const Log = (props) => {
  return <span>{props.message}</span>;
};

const Error = (props) => {
  return (
    <span className={classes.error}>
      <BugReportIcon style={{ fontSize: 16 }} />
      {props.message}
    </span>
  );
};

const Warning = (props) => {
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
    >
      {DUMMY_DATA.map((data) => {
        if (data.type === "error") {
          return <Error key={data.id} message={data.message} />;
        } else if (data.type === "warning") {
          return <Warning key={data.id} message={data.message} />;
        } else {
          return <Log key={data.id} message={data.message} />;
        }
      })}
    </div>
  );
};

export default Console;
