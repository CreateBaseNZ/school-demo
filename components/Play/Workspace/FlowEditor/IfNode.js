import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const IfNode = ({ data }) => {
  const [coords, setCoords] =useState(data.default);

  const changeHandler = (event) => {
    const newCoords = { ...coords, [event.target.name]: event.target.value };
    data.callBack(newCoords);
    setCoords(newCoords);
  };

  const focusHandler = (event) => {
    event.target.select();
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`${classes.node} ${classes.if} ${classes.arm}`}>
      <Handle
        type="target"
        position="left"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <h5>
        <OpenWithRoundedIcon />
        If
      </h5>
      <div className={classes.inputContainer}>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-x" style={{ color: "#F50F30" }}>
            var1
          </label>
          <input
            type="any"
            id="if-var1"
            name="var1"
            placeholder="0"
            value={coords.var1}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-y" style={{ color: "#1ECC30" }}>
            sign
          </label>
          <input
            type="any"
            id="if-sign"
            name="sign"
            placeholder=">"
            value={coords.sign}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-z">
            var2
          </label>
          <input
            type="any"
            id="if-var2"
            name="var2"
            placeholder="0"
            value={coords.var2}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
      </div>
      <Handle
        type="source"
        id="true"
        position="top"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
      <Handle
        type="source"
        id="false"
        position="right"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
      <Handle
        type="source"
        id="Continue"
        position="bottom"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
    </div>
  );
};

export default memo(IfNode);
