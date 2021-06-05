import { useContext } from "react";
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
    id: "435f34s",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "sdfgt34",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "dch5",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "45hdf45",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "45df",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "5dfg4y5",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "rmtetr",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "xcvb",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph something something lorem ipsum.",
  },
  {
    id: "yuio",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "fgh8o",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "asdf5y",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "dh5",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "125",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
  {
    id: "12763dh5",
    type: "warning",
    message:
      "The React Flow parent container needs a width and a height to render the graph.",
  },
];

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
