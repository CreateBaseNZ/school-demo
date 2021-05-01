import Link from "next/link";

import classes from "./Nav.module.scss";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.path}>
        <Link className={classes.pathLink} href="/">
          Project Name
        </Link>
        <ChevronRightIcon fontSize="small" />
        <Link className={classes.pathLink} href="/">
          Subsystem Name
        </Link>
        <ChevronRightIcon fontSize="small" />
        <Link className={classes.pathLink} href="/">
          Step Name
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
