import { useRouter } from "next/router";
import { NavContextProvider } from "../../store/nav-context";

import Nav from "./Nav/Nav";
import HeaderButtons from "./HeaderButtons";

import classes from "./Header.module.scss";

const Header = () => {
  const router = useRouter();

  let showHeader = true;
  let showStage = true;
  const url = router.pathname;

  if (url === "/") {
    showHeader = false;
  } else if (url === "/menu") {
    showStage = false;
  }

  return (
    <header
      className={classes.header}
      style={{ display: showHeader ? "flex" : "none" }}
    >
      <NavContextProvider>
        <Nav showStage={showStage} />
      </NavContextProvider>
      <HeaderButtons />
    </header>
  );
};

export default Header;
