import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "./SplitPane";

import Contents from "./Contents";
import Simulation from "../Simulation/Simulation";

import classes from "./PlayInterface.module.scss";

const PlayInterface = () => {
  return (
    <SplitPane className={classes.interface} orientation="shelve">
      <SplitPaneLeft>
        <Simulation />
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
