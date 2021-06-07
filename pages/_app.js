import { useEffect, useState } from "react";
import { FullscreenContextProvider } from "../store/fullscreen-context";
import { NavContextProvider } from "../store/nav-context";
import axios from "axios";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  // Initialise Cookie
  useEffect(() => {
    (async () => {
      let data;
      // Set Cookie
      try {
        data = (await axios.post("/api/cookie/set"))["data"];
      } catch (error) {
        data = { status: "error", content: error };
      }
      switch (data.status) {
        case "succeeded":
          // TODO: Success handling
          break;
        case "failed":
          // TODO: Fail handling
          break;
        case "error":
          // TODO: Error Handling
          break;
        default:
          break;
      }
      return;
    })();
  }, []);

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
