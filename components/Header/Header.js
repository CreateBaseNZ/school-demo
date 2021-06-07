import { useRouter } from "next/router";

import Nav from "./Nav/Nav";
import HeaderButtons from "./HeaderButtons";

import classes from "./Header.module.scss";

const Header = () => {
  const router = useRouter();

  let showHeader = true;
  let showSubsystem = true;
  let showStep = true;
  const url = router.pathname;

  if (url === "/") {
    showHeader = false;
  } else if (url.includes("menu")) {
    showSubsystem = false;
  }

  return (
    <header
      className={classes.header}
      style={{ display: !showHeader && "none" }}
    >
      <Nav showStep={showStep} showSubsystem={showSubsystem} />
      <div id="editor-toggle-portal" className={classes.switch}></div>
      <HeaderButtons />
    </header>
  );
};

export default Header;
