import { useRouter } from "next/router";
import { NavContextProvider } from "../../store/nav-context";

import Nav from "./Nav/Nav";
import HeaderButtons from "./HeaderButtons";

import classes from "./Header.module.scss";

const Header = () => {
  const router = useRouter();

  let showNav = true;
  let buttons = {
    showHelp: true,
    showSettings: true,
    showFeedback: true,
    showFullscreen: true,
    showLogo: true,
  };
  let underline = true;

  const url = router.pathname;

  if (url === "/") {
    return null;
  } else if (url === "/explore") {
    showNav = false;
    buttons = { ...buttons, showSettings: false, showFullscreen: false };
    underline = false;
  }

  return (
    <header
      className={`${classes.header} ${underline ? "" : classes.noUnderline}`}
    >
      {showNav && (
        <NavContextProvider>
          <Nav />
        </NavContextProvider>
      )}
      <HeaderButtons {...buttons} />
    </header>
  );
};

export default Header;
