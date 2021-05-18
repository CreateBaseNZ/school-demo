import { useContext } from "react";
import NavContext from "../../../store/nav-context";

import NavItem from "./NavItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

import classes from "./Nav.module.scss";
import Link from "next/link";

const DUMMY_PROJECT_STEPS = [
  { title: "Define", path: "/menu/define", query: "define" },
  { title: "Plan", path: "/menu/plan", query: "plan" },
  { title: "Create", path: "/menu/create", query: "create" },
  { title: "Improve", path: "/menu/improve", query: "improve" },
];
const DUMMY_SUBSYSTEMS = [
  { title: "Subsystem 1", path: "/menu/create", query: "create" },
  { title: "Subsystem 2", path: "/menu/create", query: "create" },
  { title: "Subsystem 3", path: "/menu/create", query: "create" },
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
          title="Improve"
          items={DUMMY_PROJECT_STEPS}
          type="Project Steps"
          path="/menu"
        />
      )}
      {props.showStage && <ChevronRightIcon fontSize="small" />}
      {props.showStage && (
        <NavItem
          title="Subsystem 1"
          items={DUMMY_SUBSYSTEMS}
          type="Subsystems"
          path="/menu/create"
          query="create"
        />
      )}
    </nav>
  );
};

export default Nav;
