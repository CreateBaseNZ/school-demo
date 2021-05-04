import { useState, useContext } from "react";
import NavItem from "./NavItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NavContext, { NavContextProvider } from "../store/nav-context";

import classes from "./Nav.module.scss";

const DUMMY_PROJECT_STEPS = [
  { key: "123", title: "Step 1" },
  { key: "456", title: "Step 2" },
];
const DUMMY_SUBSYSTEMS = [
  { key: "101", title: "Subsystem 1" },
  { key: "010", title: "Subsystem 2" },
  { key: "111", title: "Subsystem 3" },
];
const DUMMY_TASKS = [
  { key: "999", title: "Task 1" },
  { key: "888", title: "Task 2" },
  { key: "777", title: "Task 3" },
  { key: "666", title: "Task 4" },
  { key: "555", title: "Task 5" },
];

const Nav = () => {
  const [isActive, setIsActive] = useState(false);

  var timerId = null;

  const onClickHandler = () => {
    setIsActive((currState) => !currState);
  };

  const onBlurHandler = () => {
    timerId = setTimeout(() => {
      setIsActive(false);
    });
  };

  const onFocusHandler = () => {
    clearTimeout(timerId);
  };

  return (
    <nav
      className={classes.nav}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
    >
      <NavItem
        title="Project Step 1"
        items={DUMMY_PROJECT_STEPS}
        type="Project Steps"
        navActive={isActive}
        onClick={onClickHandler}
      />
      <ChevronRightIcon fontSize="small" />
      <NavItem
        title="Subsystem 1"
        items={DUMMY_SUBSYSTEMS}
        type="Subsystems"
        navActive={isActive}
        onClick={onClickHandler}
      />
      <ChevronRightIcon fontSize="small" />
      <NavItem
        title="Task 1"
        items={DUMMY_TASKS}
        type="Tasks"
        navActive={isActive}
        onClick={onClickHandler}
      />
    </nav>
  );
};

export default Nav;
