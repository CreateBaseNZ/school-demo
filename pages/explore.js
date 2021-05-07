import Head from "next/head";
import HeaderButtons from "/components/Header/HeaderButtons";
import ExploreInterface from "/components/Layout/ExploreInterface";

import classes from "/styles/Explore.module.scss";

const Explore = () => {
  return (
    <div className={classes.explore}>
      <Head>
        <title>Explore | CreateBase</title>
      </Head>
      <HeaderButtons
        className={classes.header}
        settings={false}
        fullscreen={false}
      />
      <ExploreInterface />
    </div>
  );
};

export default Explore;
