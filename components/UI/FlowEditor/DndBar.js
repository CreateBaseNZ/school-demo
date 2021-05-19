import classes from "./DndBar.module.scss";

const DndBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={classes.wrapper}>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className={`${classes.dndnode} ${classes.input}`}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className={classes.dndnode}
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className={`${classes.dndnode} ${classes.output}`}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};

export default DndBar;
