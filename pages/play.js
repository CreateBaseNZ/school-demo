import { useContext, useEffect } from "react";
import FullscreenContext from "/store/fullscreen-context";

import Head from "next/head";
import PlayInterface from "/components/Layout/PlayInterface";

import Layout from "/components/Layout/Layout";

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
    <Layout>
      <Head>
        <title>Play | CreateBase</title>
      </Head>
      <PlayInterface />
    </Layout>
  );
};

export default Play;
