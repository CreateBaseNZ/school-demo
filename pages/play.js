import { useContext, useEffect } from "react";
import FullscreenContext from "/store/fullscreen-context";

import Head from "next/head";
import Header from "/components/Header/Header";
import PlayInterface from "/components/Layout/PlayInterface";

import classes from "/styles/Play.module.scss";

const Play = () => {
  const ctx = useContext(FullscreenContext);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const resizeHandler = () => {
    ctx.resizeHandler();
  };

  return (
    <div className={classes.play}>
      <Head>
        <title>Play | CreateBase</title>
      </Head>
      <Header />
      <PlayInterface />
    </div>
  );
};

export default Play;
