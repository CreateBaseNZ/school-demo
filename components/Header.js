import Nav from "./Nav";
import HeaderButtons from "./HeaderButtons";

import classes from "./Header.module.scss";
import { NavContextProvider } from "../store/nav-context";

const Header = () => {
  return (
    <header className={classes.header}>
      {/* <NavContextProvider> */}
      <Nav />
      {/* </NavContextProvider> */}
      <HeaderButtons />
    </header>
  );
};

export default Header;
