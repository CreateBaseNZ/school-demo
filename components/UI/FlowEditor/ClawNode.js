import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

import SettingsEthernetRoundedIcon from "@material-ui/icons/SettingsEthernetRounded";

import classes from "./Nodes.module.scss";

const ClawNode = ({ data }) => {
  const [isOpen, setValue] = useState(data.default.isOpen);

  const changeHandler = () => {
    data.callBack({ isOpen: !isOpen });
    setValue((current) => !current);
  };

  return (
    <div className={`${classes.node} ${classes.move} ${classes.claw}`}>
      <Handle
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
        <SettingsEthernetRoundedIcon />
        Activate Claw
      </h5>
      <div className={classes.radioContainer}>
        <div className={classes.radioWrapper}>
          <input
            type="radio"
            id="open"
            name="activeClaw"
            value="open"
            checked={isOpen}
            onChange={changeHandler}
          />
          <span className={classes.customRadio}></span>
          <label htmlFor="open">Open</label>
        </div>
        <div className={classes.radioWrapper}>
          <input
            type="radio"
            id="close"
            name="activeClaw"
            value="close"
            checked={!isOpen}
            onChange={changeHandler}
          />
          <span className={classes.customRadio}></span>
          <label htmlFor="close">Close</label>
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

export default memo(ClawNode);
