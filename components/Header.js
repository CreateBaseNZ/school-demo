import Image from "next/image";
import Nav from "./Nav";

import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <Nav />
      <Image src="/header-logo.png" width="185" height="34" alt="CreateBase" />
    </header>
  );
};

export default Header;
