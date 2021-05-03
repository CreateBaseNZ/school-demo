import Link from "next/link";

import classes from "./NavDropdown.module.scss";

const NavDropdown = (props) => {
  return (
    <div className={classes.dropdown}>
      {props.items && props.items.map((item) => <button>{item}</button>)}
      <div className={classes.separator} />
      <Link href="/">{`See all ${props.type}`}</Link>
    </div>
  );
};

export default NavDropdown;
