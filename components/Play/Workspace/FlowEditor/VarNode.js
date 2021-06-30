import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const isValidConnection = (connection) => {
  connection.target === "unconnectable";
};

const VarNode = ({ data }) => {
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
        Variable
      </h5>
      <Handle
        id="var"
        type="target"
        position="left"
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
            name="varName"
            placeholder="varOut"
            value={coords.varName}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(VarNode);
