import React from 'react'

const StatCard = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className='border-1 border-600 flex flex-col justify-center items-center gap-6 w-224 h-81 leading-18'>
            <div className='text-14 text-500'>{title}</div>
            <div className='text-20'>{value}</div>
        </div>
    )
};

const LeaderboardStats = () => {
    const stats = [
        {
            title: 'Total Volume',
            value: '$444,444.44'
        },
        {
            title: 'Traders',
            value: '4,444'
        },
        {
            title: 'Total prizes',
            value: '$5,000+'
        }
    ]

    return (
        <div className='flex gap-42 w-605 lg:w-757'>
            {stats.map((stat, index) => (
                <StatCard key={index} title={stat.title} value={stat.value} />
            ))}
        </div>
    )
}

export default LeaderboardStats