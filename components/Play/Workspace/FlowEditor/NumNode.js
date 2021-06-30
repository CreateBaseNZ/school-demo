import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const isValidConnection = (connection) => {
  connection.target === "unconnectable";
};

const NumNode = ({ data }) => {
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
    <div className={`${classes.node} ${classes.start}`}>
      <h5>
      <OpenWithRoundedIcon />
        Number
      </h5>
      <Handle
        id="num"
        type="source"
        position="right"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
      <div className={classes.inputContainer}>
        <div className={classes.inputWrapper}>
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
      </div>
    </div>
  );
};

export default memo(NumNode);
