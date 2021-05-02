import Link from "next/link";

import classes from "./Nav.module.scss";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <Link href="/">Project Name</Link>
      <ChevronRightIcon fontSize="small" />
      <Link href="/">Subsystem Name</Link>
      <ChevronRightIcon fontSize="small" />
      <Link href="/">Step Name</Link>
    </nav>
  );
};

export default Nav;
