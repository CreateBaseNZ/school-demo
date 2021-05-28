import { useContext, useEffect } from "react";
import NavContext from "/store/nav-context";

import Head from "next/head";

import Layout from "/components/Layout/Layout";
import ImproveInterface from "/components/Layout/ImproveInterface";

const HaveYourSay = () => {
  const navCtx = useContext(NavContext);

  useEffect(() => {
    navCtx.setActiveStep("Have Your Say");
  }, []);

  return (
    <Layout>
      <Head>
        <title>Have Your Say | CreateBase</title>
      </Head>
      <ImproveInterface />
    </Layout>
  );
};

export default HaveYourSay;
