import Link from "next/link";
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "./SplitPane";

import Contents from "./Contents";

import classes from "./Interface.module.scss";

const Interface = () => {
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

export default Interface;
