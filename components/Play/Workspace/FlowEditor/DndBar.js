import SettingsEthernetRoundedIcon from "@material-ui/icons/SettingsEthernetRounded";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShift";
import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";
import MemoryIcon from "@material-ui/icons/Memory";
import SettingsInputHdmiOutlinedIcon from "@material-ui/icons/SettingsInputHdmiOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";

import StartNode from "./StartNode";

import classes from "./DndBar.module.scss";

const DndBar = () => {
  const onDragStart = (event, nodeType) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.dataTransfer.setData(
      "application/reactflow",
      `${nodeType}-${x}-${y}`
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={classes.container}>
      <div className={classes.description}>Drag &amp; Drop</div>
      <div className={classes.wrapper}>
        <div
          className={`${classes.dndNode} ${classes.move}`}
          onDragStart={(event) => onDragStart(event, "move")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Move Arm
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.if}`}
          onDragStart={(event) => onDragStart(event, "if")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            If
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.while}`}
          onDragStart={(event) => onDragStart(event, "while")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            While
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.for}`}
          onDragStart={(event) => onDragStart(event, "for")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Repeat
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.compare}`}
          onDragStart={(event) => onDragStart(event, "compare")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Compare
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.math}`}
          onDragStart={(event) => onDragStart(event, "math")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Math
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.move} ${classes.gravity}`}
          onDragStart={(event) => onDragStart(event, "gravity")}
          draggable
        >
          <h5>
            <FilterTiltShiftIcon />
            Gravity Switch
          </h5>
          <div className={classes.radioContainer}>
            <div className={classes.radioWrapper}>
              <span className={classes.customRadio}></span>
              <label>On</label>
            </div>
            <div className={classes.radioWrapper}>
              <span className={classes.customRadio}></span>
              <label>Off</label>
            </div>
          </div>
        </div>
        <div
          className={`${classes.dndNode} ${classes.intialise}`}
          onDragStart={(event) => onDragStart(event, "intialise")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Intialise
          </h5>
        </div>
        <div
          className={`${classes.dndNode} ${classes.num}`}
          onDragStart={(event) => onDragStart(event, "num")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Number
          </h5>
          <div className={classes.inputContainer}>
            <div className={classes.inputWrapper}>
              <label htmlFor="move-x" style={{ color: "#F50F30" }}>
                value
              </label>
              <input type="number" id="move-x" />
            </div>
          </div>
        </div>
        <div
          className={`${classes.dndNode} ${classes.var}`}
          onDragStart={(event) => onDragStart(event, "var")}
          draggable
        >
          <h5>
            <OpenWithRoundedIcon />
            Variable
          </h5>
          <div className={classes.inputContainer}>
            <div className={classes.inputWrapper}>
              <label htmlFor="move-x" style={{ color: "#F50F30" }}>
                value
              </label>
              <input type="number" id="move-x" />
            </div>
          </div>
        </div>
        {/* <div
          className={`${classes.dndNode} ${classes.read}`}
          onDragStart={(event) => onDragStart(event, "read")}
          draggable
        >
          <h5>
            <MemoryIcon />
            Read Encoder
          </h5>
          <div className={classes.selectWrapper}>
            <select name="read-motor" id="read-motor" required>
              <option value="" hidden></option>
              <option value="Motor A">Motor A</option>
              <option value="Motor B">Motor B</option>
              <option value="Motor C">Motor C</option>
            </select>
          </div>
        </div> */}
        {/* <div
          className={`${classes.dndNode} ${classes.set}`}
          onDragStart={(event) => onDragStart(event, "set")}
          draggable
        >
          <h5>
            <SettingsInputHdmiOutlinedIcon />
            Set Up Arm
          </h5>
          <div className={classes.selectWrapper}>
            <select name="set-motor" id="set-motor" required>
              <option value="" hidden></option>
              <option value="Motor A">Motor A</option>
              <option value="Motor B">Motor B</option>
              <option value="Motor C">Motor C</option>
            </select>
          </div>
        </div> */}
        {/* <div
          className={`${classes.dndNode} ${classes.pause}`}
          onDragStart={(event) => onDragStart(event, "pause")}
          draggable
        >
          <h5>
            <PauseCircleOutlineOutlinedIcon />
            Pause
          </h5>
          <div className={classes.selectAndInput}>
            <div className={classes.inputWrapper}>
              <input type="number" id="pause-duration" />
            </div>
            <div className={classes.selectWrapper}>
              <select name="pause-unit" id="pause-unit" required>
                <option value="" hidden></option>
                <option value="ms">ms</option>
                <option value="s">s</option>
              </select>
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default DndBar;
