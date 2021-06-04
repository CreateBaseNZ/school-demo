import { MessageContextProvider } from "../../store/message-context";
import Header from "../Header/Header";

import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <MessageContextProvider>
      <div className={`${classes.layout} ${props.className}`}>
        <Header />
        {props.children}
      </div>
    </MessageContextProvider>
  );
};

export default Layout;
