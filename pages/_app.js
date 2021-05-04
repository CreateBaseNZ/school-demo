import { FullscreenContextProvider } from "/store/fullscreen-context";

import "/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <FullscreenContextProvider>
      <Component {...pageProps} />
    </FullscreenContextProvider>
  );
}

export default MyApp;
