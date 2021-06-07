import { useContext } from "react";
import NavContext from "/store/nav-context";

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
  {
    title: "The Gravity Wand",
    path: "/play/the-gravity-wand",
    query: "",
    id: "the-gravity-wand",
  },
  {
    title: "Moving the Arm",
    path: "/play/moving-the-arm",
    query: "",
    id: "moving-the-arm",
  },
  {
    title: "Collecting the Items",
    path: "/play/collecting-the-items",
    query: "",
    id: "collecting-the-items",
  },
];

const Nav = ({ showStep, showSubsystem }) => {
  const ctx = useContext(NavContext);

  return (
    <nav className={classes.nav} onBlur={ctx.onBlur} onFocus={ctx.onFocus}>
      <Link href="/">
        <HomeRoundedIcon className={classes.home} fontSize="small" />
      </Link>
      {showStep && (
        <NavItem
          title={ctx.activeStep}
          items={DUMMY_PROJECT_STEPS}
          type="Project Steps"
          path="/menu"
        />
      )}
      {showSubsystem && ctx.activeSubsystem && (
        <ChevronRightIcon fontSize="small" />
      )}
      {showSubsystem && ctx.activeSubsystem && (
        <NavItem
          items={DUMMY_SUBSYSTEMS}
          type="Subsystems"
          path="/menu"
          itemClassName="terminate-code"
        />
      )}
    </nav>
  );
};

export default Nav;
