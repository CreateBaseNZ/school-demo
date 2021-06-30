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
        id="flow"
        type="target"
        position="left"
        style={{
          top:"33.3%",
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <Handle
        id="boolVar"
        type="target"
        position="left"
        style={{
          top:"66.6%",
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <h5>
        <OpenWithRoundedIcon />
        If
      </h5>
      <Handle
        type="source"
        id="flow_0"
        position="right"
        style={{
          top:"25%",
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
      <Handle
        type="source"
        id="flow_1"
        position="right"
        style={{
          top:"50%",
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
      <Handle
        type="source"
        id="flow_2"
        position="right"
        style={{
          top:"75%",
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
    </div>
  );
};

export default memo(IfNode);
