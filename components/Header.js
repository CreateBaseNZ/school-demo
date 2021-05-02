import Nav from "./Nav";
import HeaderButtons from "./HeaderButtons";

import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <Nav />
      <HeaderButtons />
    </header>
  );
};

export default Header;
