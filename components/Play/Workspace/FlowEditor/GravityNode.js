import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShift";
import classes from "./Nodes.module.scss";

const GravityNode = ({ id, data }) => {
  const [isOn, setIsOne] = useState(data.default.isOn);

  const changeHandler = () => {
    data.callBack({ isOn: !isOn });
    setIsOne((current) => !current);
  };

  return (
    <div className={`${classes.node} ${classes.move} ${classes.gravity}`}>
      <Handle
        id="flow"
        type="target"
        position="left"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
        onConnect={(data) => console.log("handle onConnect", data)}
      />
      <h5>
        <FilterTiltShiftIcon />
        Gravity Switch
      </h5>
      <div className={classes.radioContainer}>
        <div className={classes.radioWrapper}>
          <input
            type="radio"
            id="on"
            name={id + "_gravity"}
            value="on"
            checked={isOn}
            onChange={changeHandler}
          />
          <span className={classes.customRadio}></span>
          <label htmlFor="on">On</label>
        </div>
        <div className={classes.radioWrapper}>
          <input
            type="radio"
            id="off"
            name={id + "_gravity"}
            value="off"
            checked={!isOn}
            onChange={changeHandler}
          />
          <span className={classes.customRadio}></span>
          <label htmlFor="off">Off</label>
        </div>
      </div>
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

export default memo(GravityNode);
