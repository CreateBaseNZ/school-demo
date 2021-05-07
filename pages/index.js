import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Welcome | CreateBase</title>
        <meta
          name="description"
          content="Unleash your inner creator. CreateBase."
        />
      </Head>
      <h1>This is the home page</h1>
      <Link href="/play">Go to the app</Link>
    </Fragment>
  );
};

export default Home;
