import { useContext, useEffect } from "react";
import NavContext from "/store/nav-context";

import Head from "next/head";

import Layout from "/components/Layout/Layout";
import ImproveInterface from "/components/Layout/ImproveInterface";

const Improve = (props) => {
  const navCtx = useContext(NavContext);

  useEffect(() => {
    navCtx.setActiveStep("Improve");
  }, []);

  return (
    <Layout>
      <Head>
        <title>Improve | CreateBase</title>
      </Head>
      <ImproveInterface />
    </Layout>
  );
};

export default Improve;
