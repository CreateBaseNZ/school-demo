import ReactDOM from "react-dom";
import {
  Log,
  Error,
  Warning,
} from "/components/Play/Workspace/Console/Console";

import classes from "/components/Play/Workspace/TabBar.module.scss";

const consoleLog = (message, type) => {
  console.log(type);
  const tab = document.querySelector("#console-tab");
  switch (type) {
    case "warning":
      ReactDOM.render(
        <Warning message={message} />,
        document.querySelector("#console")
      );
      if (!tab.querySelector("input").checked) {
        tab.classList.add(classes.tabWarning);
      }
      break;
    case "error":
      ReactDOM.render(
        <Error message={message} />,
        document.querySelector("#console")
      );
      if (!tab.querySelector("input").checked) {
        tab.classList.add(classes.tabError);
      }
      break;
    default:
      ReactDOM.render(
        <Log message={message} />,
        document.querySelector("#console")
      );
      if (!tab.querySelector("input").checked) {
        tab.classList.add(classes.tabNew);
      }
      break;
  }
};

export default consoleLog;
