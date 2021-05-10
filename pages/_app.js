import { FullscreenContextProvider } from "../store/fullscreen-context";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <FullscreenContextProvider>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <Component {...pageProps} />
    </FullscreenContextProvider>
  );
}

export default MyApp;
