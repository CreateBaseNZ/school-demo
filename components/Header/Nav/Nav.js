import { useContext } from "react";
import NavContext from "../../../store/nav-context";

import NavItem from "./NavItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

import classes from "./Nav.module.scss";
import Link from "next/link";

const DUMMY_PROJECT_STEPS = [
  { title: "Define" },
  { title: "Plan" },
  { title: "Create" },
  { title: "Improve" },
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

const Nav = (props) => {
  const ctx = useContext(NavContext);

  return (
    <nav className={classes.nav} onBlur={ctx.onBlur} onFocus={ctx.onFocus}>
      <Link href="/">
        <HomeRoundedIcon className={classes.home} fontSize="small" />
      </Link>
      {props.showStage && (
        <NavItem
          title="Project Step 1"
          items={DUMMY_PROJECT_STEPS}
          type="Project Steps"
          step="1"
        />
      )}
      {props.showStage && <ChevronRightIcon fontSize="small" />}
      {props.showStage && (
        <NavItem
          title="Subsystem 1"
          items={DUMMY_SUBSYSTEMS}
          type="Subsystems"
          step="3"
        />
      )}
      {props.showStage && <ChevronRightIcon fontSize="small" />}
      {props.showStage && (
        <NavItem title="Task 1" items={DUMMY_TASKS} type="Tasks" />
      )}
    </nav>
  );
};

export default Nav;
