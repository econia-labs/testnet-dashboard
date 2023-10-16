import React from 'react'

const Maintenance = () => {
    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw] fixed top-0 -left-0 bg-noise'>
            <div className='w-[512px] max-w-full text-center'>
                <div className="heart mb-[60px]"></div>
                <h1 className='font-jost font-bold text-32 leading-52 mb-[11.1px]'>Under Maintenance</h1>
                <p className='text-14 font-mono font-light leading-30'>
                    The leaderboard backend is offline for maintenance and will be back online shortly. Your data is not lost, because all of the data is indexed straight from the blockchain! 💙
                </p>
            </div>
        </div>
    )
}

export default Maintenance