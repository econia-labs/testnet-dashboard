import LeaderBoardContainer from '@/containers/leaderboard'
import Head from 'next/head'
import React from 'react'

const LeaderBoard = () => {
    return (
        <>
            <Head>
                <title>Econia - Leaderboard</title>
            </Head>
            <LeaderBoardContainer />
        </>
    )
}

export default LeaderBoard