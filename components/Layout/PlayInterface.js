// import SplitPane, {
//   Divider,
//   SplitPaneBottom,
//   SplitPaneLeft,
//   SplitPaneRight,
//   SplitPaneTop,
// } from "./SplitPane";

import SplitPane from "react-split-pane";

import Contents from "./Contents";
import Simulation from "../Simulation/Simulation";
import Workspace from "../Workspace/Workspace";

import classes from "./PlayInterface.module.scss";

const PlayInterface = () => {
  return (
    <SplitPane
      className={classes.splitVertical}
      split="vertical"
      defaultSize={"50%"}
      primary={"second"}
    >
      <Simulation />
      <SplitPane
        split="horizontal"
        className={classes.splitHorizontal}
        defaultSize={"25%"}
      >
        <Contents />
        <Workspace />
      </SplitPane>
    </SplitPane>
    // <SplitPane className={classes.interface} orientation="shelve">
    //   <SplitPaneLeft>
    //   </SplitPaneLeft>
    //   <Divider orientation="vertical" />
    //   <SplitPaneRight>
    //     <SplitPane orientation="stack">
    //       <SplitPaneTop>
    //         <Contents />
    //       </SplitPaneTop>
    //       <Divider orientation="horizontal" />
    //       <SplitPaneBottom>
    //         <Workspace />
    //       </SplitPaneBottom>
    //     </SplitPane>
    //   </SplitPaneRight>
    // </SplitPane>
  );
};

export default PlayInterface;
