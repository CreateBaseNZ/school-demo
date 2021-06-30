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
        id="flow"
        type="target"
        position="left"
        style={{
          top: '12.5%',
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <Handle
        id="x"
        type="target"
        position="left"
        style={{
          top: '37.5%',
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <Handle
        id="y"
        type="target"
        position="left"
        style={{
          top: '62.5%',
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <Handle
        id="z"
        type="target"
        position="left"
        style={{
          top: '87.5%',
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <h5>
        <OpenWithRoundedIcon />
        Move Arm
      </h5>
      <Handle
        id="flow"
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
