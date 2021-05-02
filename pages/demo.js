import { Fragment as div } from "react";
import Head from "next/head";

import Header from "../components/Header";
import Interface from "../components/Interface";

import classes from "../styles/Demo.module.scss";

const Demo = () => {
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
