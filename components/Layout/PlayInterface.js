import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "./SplitPane";

import Contents from "./Contents";

import classes from "./PlayInterface.module.scss";

const PlayInterface = () => {
  return (
    <SplitPane className={classes.interface} orientation="shelve">
      <SplitPaneLeft>
        <div>Simulation goes here</div>
      </SplitPaneLeft>
      <Divider orientation="vertical" />
      <SplitPaneRight>
        <SplitPane orientation="stack">
          <SplitPaneTop>
            <Contents />
          </SplitPaneTop>
          <Divider orientation="horizontal" />
          <SplitPaneBottom>
            <div>Editor goes here</div>
          </SplitPaneBottom>
        </SplitPane>
      </SplitPaneRight>
    </SplitPane>
  );
};

export default PlayInterface;
