import Image from "next/image";
import Layout from "/components/Layout/Layout";
import Link from "next/link";
import Head from "next/head";

import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import WhiteLogo from "/components/UI/WhiteLogo";

import classes from "/styles/Index.module.scss";

const Index = () => {
  return (
    <Layout className={classes.index}>
      <Head>
        <title>Welcome | CreateBase</title>
        <meta
          name="description"
          content="Unleash your inner creator. CreateBase."
        />
      </Head>
      <div className={classes.bg}>
        <Image
          src="/landing.png"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Landing image"
        />
      </div>
      <div className={classes.container}>
        <h1 className={classes.h1}>
          <span>D</span>
          <span>E</span>
          <span>M</span>
          <span>O</span>
        </h1>
        <div style={{ position: "relative", width: "650px", height: "125px" }}>
          <WhiteLogo layout="fill" objectFit="contain" quality={100} />
        </div>
        <Link href="/explore">
          <a className={classes.btn}>
            <span>Start</span>
            <PlayArrowRoundedIcon style={{ fontSize: "24" }} />
            <div className={classes.liquid}></div>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
