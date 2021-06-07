import { useContext, useEffect } from "react";
import NavContext from "/store/nav-context";

import Head from "next/head";

import Layout from "/components/Layout/Layout";
import FeedbackInterface from "/components/Layout/FeedbackInterface";

const HaveYourSay = () => {
  const navCtx = useContext(NavContext);

  return (
    <Layout>
      <Head>
        <title>Have Your Say | CreateBase</title>
      </Head>
      <FeedbackInterface />
    </Layout>
  );
};

export default HaveYourSay;
