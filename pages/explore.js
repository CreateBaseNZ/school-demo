import Head from "next/head";
import Layout from "/components/Layout/Layout";
import ExploreInterface from "/components/Layout/ExploreInterface";

const Explore = () => {
  return (
    <Layout>
      <Head>
        <title>Explore | CreateBase</title>
      </Head>
      <ExploreInterface />
    </Layout>
  );
};

export default Explore;
