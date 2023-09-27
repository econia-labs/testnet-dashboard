import React from 'react'

interface leaderboardRanking {
    name: string,
    trades: number,
    volume: number,
    points: number
}

const leaderboardRankings: leaderboardRanking[] = [
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
    {
        name: 'econia.apt',
        trades: 33333,
        volume: 111111111.11,
        points: 3
    },
]

const LeaderboardTable = () => {
    return (
        <div className="flex items-center justify-center overflow-hidden w-317 sm:w-437 md:w-605 lg:w-757">
            <table className="w-full table-auto sm:table-fixed">
                <thead>
                    <tr className="uppercase h-52">
                        <th className="text-12 text-500 uppercase text-center font-normal">Rank</th>
                        <th className="text-12 text-500 uppercase text-center font-normal">Trader</th>
                        <th className="text-12 text-500 uppercase text-center font-normal hidden lg:table-cell">Trades</th>
                        <th className="text-12 text-500 uppercase text-center font-normal hidden md:table-cell">Volume</th>
                        <th className="text-12 text-500 uppercase text-center font-normal">Points</th>
                    </tr>
                </thead>
                <tbody className="font-light">
                    <tr className="bg-blue bg-opacity-30 py-5.64 text-center font-normal">
                        <td className="py-5.64">
                            -
                        </td>
                        <td className="uppercase">
                            you
                        </td>
                        <td>
                            -
                        </td>
                        <td className='hidden lg:table-cell'>
                            -
                        </td>
                        <td className='hidden md:table-cell'>
                            -
                        </td>
                    </tr>
                    {
                        leaderboardRankings.map((ranking: leaderboardRanking, index) => {
                            return (
                                <tr key={index} className={`text-center font-normal ${index % 2 === 0 ? 'bg-600 bg-opacity-20' : ''}`}>
                                    <td className={`py-5.64 ${index < 3 ? 'text-blue' : ''}`}>
                                        {index + 1}
                                    </td>
                                    <td className="uppercase">
                                        {ranking.name}
                                    </td>
                                    <td>
                                        {ranking.trades}
                                    </td>
                                    <td className='hidden lg:table-cell'>
                                        {ranking.volume}
                                    </td>
                                    <td className='hidden md:table-cell'>
                                        {ranking.points}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default LeaderboardTable