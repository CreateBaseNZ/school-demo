import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";

import classes from "./EditorToggleButton.module.scss";

const EditorToggleButton = (props) => {
  return (
    <label className={classes.switch}>
      <input type="checkbox" onChange={props.onChange} />
      <span className={classes.slider}></span>
      <div className={classes.flow}>
        <AccountTreeRoundedIcon style={{ fontSize: 16 }} /> Flow
      </div>
      <div className={classes.cpp}>
        <CodeRoundedIcon style={{ fontSize: 16 }} /> Text
      </div>
    </label>
  );
};

export default EditorToggleButton;
