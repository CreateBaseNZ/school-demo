import { useContext } from "react";
import NavContext from "../../../store/nav-context";

import NavItem from "./NavItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import classes from "./Nav.module.scss";
import Link from "next/link";

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
  const ctx = useContext(NavContext);

  return (
    <nav className={classes.nav} onBlur={ctx.onBlur} onFocus={ctx.onFocus}>
      <Link href="/">
        <HomeOutlinedIcon className={classes.home} fontSize="small" />
      </Link>
      <NavItem
        title="Project Step 1"
        items={DUMMY_PROJECT_STEPS}
        type="Project Steps"
      />
      <ChevronRightIcon fontSize="small" />
      <NavItem title="Subsystem 1" items={DUMMY_SUBSYSTEMS} type="Subsystems" />
      <ChevronRightIcon fontSize="small" />
      <NavItem title="Task 1" items={DUMMY_TASKS} type="Tasks" />
    </nav>
  );
};

export default Nav;
