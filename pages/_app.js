import { Fragment } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
