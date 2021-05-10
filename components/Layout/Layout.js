import { FeedbackContextProvider } from "../../store/feedback-context";
import Header from "../Header/Header";

import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <FeedbackContextProvider>
      <div className={`${classes.layout} ${props.className}`}>
        <Header />
        {props.children}
      </div>
    </FeedbackContextProvider>
  );
};

export default Layout;
