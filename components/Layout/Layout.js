import { FullscreenContextProvider } from "../../store/fullscreen-context";
import { FeedbackContextProvider } from "../../store/feedback-context";
import Header from "../Header/Header";

import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <FullscreenContextProvider>
      <FeedbackContextProvider>
        <div className={`${classes.layout} ${props.className}`}>
          <Header />
          {props.children}
        </div>
      </FeedbackContextProvider>
    </FullscreenContextProvider>
  );
};

export default Layout;
