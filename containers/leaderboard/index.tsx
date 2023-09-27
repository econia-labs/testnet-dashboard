import React from 'react'
import CountDown from '@/components/count-down'
import LeaderboardStats from '@/components/leaderboard-stats'
import LeaderboardTable from '@/components/leaderboard-table'

const LeaderBoardContainer = () => {
    return (
        <div className='flex flex-col items-center w-317 sm:w-437 md:w-605 lg:w-757 m-auto'>
            <div className='mt-58'><CountDown /></div>
            <div className='mt-44 hidden md:flex'><LeaderboardStats /></div>
            <div className='mt-42 md:mt-52 lg:mt-36'><LeaderboardTable /></div>
            <div className="fixed bottom-0 w-full h-290 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
        </div>
    )
}

export default LeaderBoardContainer