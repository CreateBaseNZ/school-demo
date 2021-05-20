import { memo } from "react";
import { Handle } from "react-flow-renderer";

import MemoryIcon from "@material-ui/icons/Memory";

import classes from "./Nodes.module.scss";

const ReadNode = ({ data }) => {
  return (
    <div className={`${classes.node} ${classes.read}`}>
      <Handle
        type="target"
        position="left"
        style={{
          background: "#8258dc",
          borderStyle: "none",
          height: "8px",
          width: "8px",
          cursor: "cell",
        }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <h5>
        <MemoryIcon />
        Read Encoder
      </h5>
      <div className={classes.selectWrapper}>
        <select
          name="read-motor"
          id="read-motor"
          defaultValue="Select a motor"
          required
        >
          <option value="" hidden>
            Select a motor
          </option>
          <option value="Motor A">Motor A</option>
          <option value="Motor B">Motor B</option>
          <option value="Motor C">Motor C</option>
        </select>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{
          background: "#8258dc",
          borderStyle: "none",
          height: "8px",
          width: "8px",
          cursor: "cell",
        }}
      />
    </div>
  );
};

export default memo(ReadNode);
