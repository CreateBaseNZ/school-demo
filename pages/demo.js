import { Fragment as div } from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/Header";

import classes from "../styles/Demo.module.scss";

const Demo = () => {
  return (
    <div className={classes.demo}>
      <Head>
        <title>Demo | CreateBase</title>
      </Head>
      <Header />
      <h1>Demo Page</h1>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default Demo;
