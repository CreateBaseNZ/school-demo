import Link from "next/link";
import { useContext, useState } from "react";
import NavContext from "../../../store/nav-context";

import classes from "./NavItem.module.scss";

const NavItem = (props) => {
  const ctx = useContext(NavContext);
  const [isHovered, setIsHovered] = useState(false);

  const mouseOverHandler = () => {
    setIsHovered(true);
    ctx.onHover(props.type);
  };

  const showDropdown =
    ctx.navIsActive && ctx.activeType === props.type && isHovered;

  return (
    <div className={classes.navItem}>
      <button
        className={showDropdown ? classes.active : ""}
        onClick={ctx.onClick}
        onMouseOver={mouseOverHandler}
      >
        {props.title}
      </button>
      {showDropdown && (
        <div className={classes.dropdown}>
          {props.items &&
            props.items.map((item) => (
              <button key={item.title}>{item.title}</button>
            ))}
          <div className={classes.separator} />
          <Link
            href={{ pathname: "/menu", query: { step: props.step } }}
          >{`See all ${props.type}`}</Link>
        </div>
      )}
    </div>
  );
};

export default NavItem;
