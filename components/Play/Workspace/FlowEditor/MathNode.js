import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";

import classes from "./Nodes.module.scss";

const MathNode = ({ data }) => {
  const [compare, setCompare] = useState(data.default);

  const changeHandler = (event) => {
    const newCompare = { ...compare, [event.target.name]: event.target.value };
    data.callBack(newCompare);
    setCompare(newCompare);
  };

  const focusHandler = (event) => {
    event.target.select();
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`${classes.node} ${classes.compare} ${classes.arm}`}>
      <Handle
        id="var1"
        type="target"
        position="top"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <Handle
        id="sign"
        type="target"
        position="left"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <Handle
        id="var2"
        type="target"
        position="bottom"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <h5>
        <OpenWithRoundedIcon />
        Math
      </h5>
      <Handle
        id="out"
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

export default memo(MathNode);
