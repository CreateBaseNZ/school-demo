import { useContext, useEffect } from "react";
import FullscreenContext from "../store/fullscreen-context";
// import createUnityInstance from "/build/Build.loader";

import Head from "next/head";

import Layout from "../components/Layout/Layout";
import PlayInterface from "../components/Layout/PlayInterface";

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

// export async function getStaticProps() {

//   return {
//     props: { result },
//   };
// }
