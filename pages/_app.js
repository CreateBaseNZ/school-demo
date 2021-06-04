import { FullscreenContextProvider } from "../store/fullscreen-context";
import { NavContextProvider } from "../store/nav-context";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <NavContextProvider>
      <FullscreenContextProvider>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <Component {...pageProps} />
      </FullscreenContextProvider>
    </NavContextProvider>
  );
}

export default MyApp;
