import React from "react";
import Head from "next/head";

import HomeContainer from "@containers/Home";
import { withAuth } from "@lib/authenticatedRoute";

const Home = () => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer />
    </>
  );
};

export const getServerSideProps = withAuth(async function ({ req, res }) {
  return {
    props: {},
  };
});

export default Home;
