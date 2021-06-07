import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FullscreenContext from "../../store/fullscreen-context";

import Layout from "../../components/Layout/Layout";
import PlayInterface from "../../components/Layout/PlayInterface";

const Play = (props) => {
  const router = useRouter();
  const FullscreenCtx = useContext(FullscreenContext);
  const [activeSubsystem, setActiveSubsystem] = useState("");

  // setting the nav
  const { asPath } = router;
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      setActiveSubsystem(strArr[2]);
    } else {
      setActiveSubsystem("");
    }
  }, [asPath]);

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
        <title>Play | CreateBase</title>
      </Head>
      <PlayInterface subsystem={activeSubsystem} />
    </Layout>
  );
};

export default Play;
