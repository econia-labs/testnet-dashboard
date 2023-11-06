import React from "react";
import Head from "next/head";
import LeaderBoardContainer from "@/containers/leaderboard";

const Home = () => {
  return (
    <>
      <Head>
        <title>Econia - Leaderboard</title>
      </Head>
      <LeaderBoardContainer />
    </>
  );
};

export default Home;
