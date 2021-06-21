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
        Math
      </h5>
      <div className={classes.inputContainer}>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-x" style={{ color: "#F50F30" }}>
            var1
          </label>
          <input
            type="any"
            id="compare-var1"
            name="var1"
            placeholder="var1"
            value={compare.var1}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-y" style={{ color: "#1ECC30" }}>
            sign
          </label>
          <input
            type="any"
            id="math-sign"
            name="sign"
            placeholder="+"
            value={compare.sign}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-z">
            var2
          </label>
          <input
            type="any"
            id="move-var2"
            name="var2"
            placeholder="var2"
            value={compare.var2}
            onChange={changeHandler}
            onFocus={focusHandler}
            onDragStart={dragHandler}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="move-z">
            out
          </label>
          <input
            type="any"
            id="move-out"
            name="out"
            placeholder="varOut"
            value={compare.out}
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

export default memo(MathNode);
