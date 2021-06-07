import ReactDOM from "react-dom";
import {
  Log,
  Error,
  Warning,
} from "/components/Play/Workspace/Console/Console";

import classes from "/components/Play/Workspace/TabBar.module.scss";

let index = 0;

const getIndex = () => {
  return index++;
};

const consoleLog = (message, type) => {
  const tab = document.querySelector("#console-tab");
  const logEl = document.createElement("div");
  logEl.classList.add("console-log");
  const console = document.querySelector("#console");
  console.appendChild(logEl);
  switch (type) {
    case "warning":
      ReactDOM.render(<Warning message={message} />, logEl);
      if (!tab.querySelector("input").checked) {
        tab.classList.add(classes.tabWarning);
      }
      break;
    case "error":
      ReactDOM.render(<Error message={message} />, logEl);
      if (!tab.querySelector("input").checked) {
        tab.classList.add(classes.tabError);
      }
      break;
    default:
      ReactDOM.render(<Log message={message} />, logEl);
      // if (!tab.querySelector("input").checked) {
      //   tab.classList.add(classes.tabNew);
      // }
      break;
  }
  console.scrollTop = console.scrollHeight;
};

export default consoleLog;
