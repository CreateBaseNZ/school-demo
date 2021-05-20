import { memo } from "react";
import { Handle } from "react-flow-renderer";

import SettingsInputHdmiOutlinedIcon from "@material-ui/icons/SettingsInputHdmiOutlined";

import classes from "./Nodes.module.scss";

const SetNode = ({ data }) => {
  return (
    <div className={`${classes.node} ${classes.set}`}>
      <Handle
        type="target"
        position="left"
        style={{
          background: "#fa6f6f",
          borderStyle: "none",
          height: "8px",
          width: "8px",
          cursor: "cell",
        }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <h5>
        <SettingsInputHdmiOutlinedIcon />
        Set Up Arm
      </h5>
      <div className={classes.selectWrapper}>
        <select
          name="set-motor"
          id="set-motor"
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
          background: "#fa6f6f",
          borderStyle: "none",
          height: "8px",
          width: "8px",
          cursor: "cell",
        }}
      />
    </div>
  );
};

export default memo(SetNode);
