import Head from "next/head";
import Layout from "../components/Layout/Layout";
import MenuInterface from "../components/Layout/MenuInterface";

const Menu = (props) => {
  return (
    <div>
      <Layout>
        <Head>
          <title>Menu | CreateBase</title>
          <meta
            name="description"
            content="Navigate through the project menu"
          ></meta>
        </Head>
        <MenuInterface />
      </Layout>
    </div>
  );
};

export default Menu;
