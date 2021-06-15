import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const IntialiseNode = ({ data }) => {
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
    <div className={`${classes.node} ${classes.intialise} ${classes.arm}`}>
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
        Intialise
      </h5>
      <div className={classes.inputContainer}>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-x" style={{ color: "#F50F30" }}>
            value
          </label>
          <input
            type="any"
            id="intialise-value"
            name="value"
            placeholder="0"
            value={coords.value}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-z">
            output
          </label>
          <input
            type="any"
            id="intialise-varName"
            name="varName"
            placeholder="Var"
            value={coords.varName}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
      </div>
      <Handle
        type="source"
        position="right"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
    </div>
  );
};

export default memo(IntialiseNode);
