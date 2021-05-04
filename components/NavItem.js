import Link from "next/link";
import { useContext, useState } from "react";
import NavContext from "../store/nav-context";

import classes from "./NavItem.module.scss";

const NavItem = (props) => {
  const ctx = useContext(NavContext);
  const [isHovered, setIsHovered] = useState(false);

  const mouseOverHandler = () => {
    setIsHovered(true);
  };

  return (
    <div className={classes.navItem}>
      <button onClick={ctx.onClick} onMouseOver={mouseOverHandler}>
        {props.title}
      </button>
      {ctx.isActive && isHovered && (
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
