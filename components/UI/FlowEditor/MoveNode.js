import { memo } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const MoveNode = ({ data }) => {
  return (
    <div className={`${classes.node} ${classes.move}`}>
      <Handle
        type="target"
        position="left"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <h5>
        <OpenWithRoundedIcon />
        Move Motor
      </h5>
      <div className={classes.inputContainer}>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-x">X</label>
          <input type="number" id="move-x" placeholder="0" />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-y">Y</label>
          <input type="number" id="move-y" placeholder="0" />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-z">Z</label>
          <input type="number" id="move-z" placeholder="0" />
        </div>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
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
