import { useContext, useState } from "react";
import Router from "next/router";
import NavContext from "../../../store/nav-context";
import { formatSubsystemName } from "/utils/capitaliseString";

import classes from "./NavItem.module.scss";

const NavItem = (props) => {
  const ctx = useContext(NavContext);
  const [isHovered, setIsHovered] = useState(false);

  const mouseOverHandler = () => {
    setIsHovered(true);
    ctx.onHover(props.type);
  };

  const clickHandler = (item) => {
    Router.push(item.path, item.path);
    ctx.onClick();
  };

  const showDropdown =
    ctx.navIsActive && ctx.activeType === props.type && isHovered;

  console.log(ctx.activeSubsystem);

  return (
    <div className={classes.navItem}>
      <button
        className={showDropdown ? classes.active : ""}
        onClick={ctx.onClick}
        title={formatSubsystemName(props.title)}
        onMouseOver={mouseOverHandler}
      >
        {formatSubsystemName(props.title)}
      </button>
      <div
        className={classes.dropdown}
        style={{ display: !showDropdown && "none" }}
      >
        {props.items &&
          props.items.map((item) => (
            <button
              key={item.title}
              title={item.title}
              className={
                ctx.activeSubsystem === item.id ? "" : props.itemClassName
              }
              onClick={() => clickHandler(item)}
            >
              {item.title}
            </button>
          ))}
        <div className={classes.separator} />
        <button
          className={props.itemClassName}
          title={`See all ${props.type}`}
          onClick={() => clickHandler({ path: props.path, query: props.query })}
        >{`See all ${props.type}`}</button>
      </div>
    </div>
  );
};

export default NavItem;
