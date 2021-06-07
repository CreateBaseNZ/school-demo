import { useContext, useEffect } from "react";
import FullscreenContext from "../../store/fullscreen-context";
import NavContext from "../../store/nav-context";

import Head from "next/head";

import Layout from "../../components/Layout/Layout";
import PlayInterface from "../../components/Layout/PlayInterface";

const Play = (props) => {
  const FullscreenCtx = useContext(FullscreenContext);
  const navCtx = useContext(NavContext);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const resizeHandler = () => {
    FullscreenCtx.resizeHandler();
  };

  return (
    <Layout>
      <Head>
        <title>Sandbox | CreateBase</title>
      </Head>
      <PlayInterface />
    </Layout>
  );
};

export default Play;
