import classes from "./TabBar.module.scss";

const TabBar = (props) => {
  const onChangeHandler = (event) => {
    console.log(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div className={classes.tabBar}>
      <span className={`${classes.slider} ${classes[`${props.active}`]}`} />
      <div className={classes.tab}>
        <input
          type="radio"
          id="flow-tab"
          name="workspace-tab"
          value="flow"
          checked={props.active === "flow"}
          onChange={onChangeHandler}
        />
        <label htmlFor="flow-tab">Flow</label>
      </div>
      <div
        className={classes.divider}
        style={{
          opacity:
            props.active === "flow" || props.active === "text" ? 0 : 0.25,
        }}
      />
      <div className={classes.tab}>
        <input
          type="radio"
          id="text-tab"
          name="workspace-tab"
          value="text"
          checked={props.active === "text"}
          onChange={onChangeHandler}
        />
        <label htmlFor="text-tab">Text</label>
      </div>
      <div
        className={classes.divider}
        style={{
          opacity:
            props.active === "text" || props.active === "console" ? 0 : 0.25,
        }}
      />
      <div id="console-tab" className={classes.tab}>
        <input
          type="radio"
          id="console-tab"
          name="workspace-tab"
          value="console"
          checked={props.active === "console"}
          onChange={onChangeHandler}
        />
        <label htmlFor="console-tab">Console</label>
      </div>
      <div
        className={classes.divider}
        style={{
          opacity: props.active === "console" ? 0 : 0.25,
        }}
      />
    </div>
  );
};

export default TabBar;
