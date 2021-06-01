import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavContext from "../../store/nav-context";
import FullscreenContext from "../../store/fullscreen-context";

import capitalise from "../../utils/capitaliseString";

import Layout from "../../components/Layout/Layout";
import PlayInterface from "../../components/Layout/PlayInterface";

const Play = (props) => {
  const router = useRouter();
  const navCtx = useContext(NavContext);
  const FullscreenCtx = useContext(FullscreenContext);
  const [activeSubsystem, setActiveSubsystem] = useState("");

  // setting the nav
  const { asPath } = router;
  useEffect(() => {
    const strArr = asPath.split("/");
    if (strArr.length > 2) {
      navCtx.setActiveSubsystem(capitalise(strArr[2]));
      setActiveSubsystem(strArr[2]);
    } else {
      navCtx.setActiveSubsystem("");
      setActiveSubsystem("");
    }
  }, [asPath]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    navCtx.setActiveStep("Create");

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