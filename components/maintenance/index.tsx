import React from 'react'
interface IMaintenanceProps {
    title?: string,
    desc?: string
}
const defaultTitle = 'Under Maintenance'
const defaultDesc = 'The leaderboard backend is offline for maintenance and will be back online shortly. Your data is not lost, because all of the data is indexed straight from the blockchain! 💙'

const Maintenance = ({ title = defaultTitle, desc = defaultDesc }: IMaintenanceProps) => {
    return (
        <div className='flex justify-center items-center h-full w-full'>
            <div className='w-[512px] max-w-full text-center'>
                <div className="heart mb-[60px]"></div>
                <h1 className='font-jost font-bold text-32 leading-52 mb-[11.1px]'>{title}</h1>
                <p className='text-14 font-mono font-light leading-30'>
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default Maintenance