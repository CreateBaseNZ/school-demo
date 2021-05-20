import { memo } from "react";
import { Handle } from "react-flow-renderer";

import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";

import classes from "./Nodes.module.scss";

const PauseNode = ({ data }) => {
  return (
    <div className={`${classes.node} ${classes.pause}`}>
      <Handle
        type="target"
        position="left"
        style={{
          background: "#ffb649",
          borderStyle: "none",
          height: "8px",
          width: "8px",
          cursor: "cell",
        }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <h5>
        <PauseCircleOutlineOutlinedIcon />
        Pause
      </h5>
      <div className={classes.selectAndInput}>
        <div className={classes.inputWrapper}>
          <input type="number" id="pause-duration" placeholder="0" />
        </div>
        <div className={classes.selectWrapper}>
          <select
            name="pause-unit"
            id="pause-unit"
            defaultValue="Unit"
            required
          >
            <option value="" hidden>
              Unit
            </option>
            <option value="ms">ms</option>
            <option value="s">s</option>
          </select>
        </div>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{
          background: "#ffb649",
          borderStyle: "none",
          height: "8px",
          width: "8px",
          cursor: "cell",
        }}
      />
    </div>
  );
};

export default memo(PauseNode);
