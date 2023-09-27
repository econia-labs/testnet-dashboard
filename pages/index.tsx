import React from 'react'
import TradeContainer from '@/containers/trade'
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Econia - Trade</title>
      </Head>
      <TradeContainer />
    </>
  )
}

export default Home