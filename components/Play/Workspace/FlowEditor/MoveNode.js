import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const MoveNode = ({ data }) => {
  const [coords, setCoords] = useState(data.default);

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
    <div className={`${classes.node} ${classes.move} ${classes.arm}`}>
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
        Move Arm
      </h5>
      <div className={classes.inputContainer}>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-x">X</label>
          <input
            type="number"
            id="move-x"
            name="x"
            placeholder="0"
            value={coords.x}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-y">Y</label>
          <input
            type="number"
            id="move-y"
            name="y"
            placeholder="0"
            value={coords.y}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-z">Z</label>
          <input
            type="number"
            id="move-z"
            name="z"
            placeholder="0"
            value={coords.z}
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

export default memo(MoveNode);
