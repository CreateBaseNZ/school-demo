import { useContext, useEffect } from "react";
import FullscreenContext from "../store/fullscreen-context";

import Head from "next/head";

import Layout from "../components/Layout/Layout";
import PlayInterface from "../components/Layout/PlayInterface";

const Play = () => {
  const ctx = useContext(FullscreenContext);

  const resizeHandler = () => {
    console.log("hello");
    ctx.resizeHandler();
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

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
