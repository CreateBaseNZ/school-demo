import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/Header";

const Demo = () => {
  return (
    <Fragment>
      <Head>
        <title>Demo | CreateBase</title>
      </Head>
      <Header />
      <h1>Demo Page</h1>
      <Link href="/">Back to home</Link>
    </Fragment>
  );
};

export default Demo;
