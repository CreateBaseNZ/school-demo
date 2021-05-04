import Link from "next/link";

import classes from "./NavItem.module.scss";

const NavItem = (props) => {
  return (
    <div className={classes.navItem}>
      <button onClick={props.onClick}>{props.title}</button>
      {props.navActive && (
        <div className={classes.dropdown}>
          {props.items &&
            props.items.map((item) => (
              <button key={item.key}>{item.title}</button>
            ))}
          <div className={classes.separator} />
          <Link href="/">{`See all ${props.type}`}</Link>
        </div>
      )}
    </div>
  );
};

export default NavItem;
