import { FullscreenContextProvider } from "/store/fullscreen-context";
import { FeedbackContextProvider } from "/store/feedback-context";

import "/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <FullscreenContextProvider>
      <FeedbackContextProvider>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <Component {...pageProps} />
      </FeedbackContextProvider>
    </FullscreenContextProvider>
  );
}

export default MyApp;
