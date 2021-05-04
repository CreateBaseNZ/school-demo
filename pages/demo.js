import { useContext, useEffect } from "react";
import FullscreenContext from "/store/fullscreen-context";

import Head from "next/head";
import Header from "/components/Header/Header";
import Interface from "/components/Layout/Interface";

import classes from "/styles/Demo.module.scss";

const Demo = () => {
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
    <div className={classes.demo}>
      <Head>
        <title>Demo | CreateBase</title>
      </Head>
      <Header />
      <Interface />
    </div>
  );
};

export default Demo;
