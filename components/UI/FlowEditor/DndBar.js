import OpenWithRoundedIcon from "@material-ui/icons/OpenWithRounded";
import MemoryIcon from "@material-ui/icons/Memory";
import SettingsInputHdmiOutlinedIcon from "@material-ui/icons/SettingsInputHdmiOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";

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
    <aside className={classes.wrapper}>
      <div className={classes.description}>Drag &amp; Drop</div>
      <div
        className={`${classes.dndNode} ${classes.move}`}
        onDragStart={(event) => onDragStart(event, "move")}
        draggable
      >
        <h5>
          <OpenWithRoundedIcon />
          Move Motor
        </h5>
        <div className={classes.inputContainer}>
          <div className={classes.inputWrapper}>
            <label htmlFor="move-x">X</label>
            <input type="number" id="move-x" placeholder="0" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="move-y">Y</label>
            <input type="number" id="move-y" placeholder="0" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="move-z">Z</label>
            <input type="number" id="move-z" placeholder="0" />
          </div>
        </div>
      </div>
      <div
        className={`${classes.dndNode} ${classes.read}`}
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
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
      </div>
      <div
        className={`${classes.dndNode} ${classes.set}`}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
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
      </div>
      <div
        className={`${classes.dndNode} ${classes.pause}`}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
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
      </div>
    </aside>
  );
};

export default DndBar;
