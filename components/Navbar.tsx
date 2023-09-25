import Image from 'next/image'
import React from 'react'
import logo1 from '../public/logo1.svg';

const Navbar = () => {
    return (
        <div className='flex justify-between items-center'>
            <Image src={logo1} alt="logo" width={117} height={19} />
            <div>
                TRADE / LEADERBOARD / RULES
            </div>
            <button className='bg-white text-800 py-1 px-4'>Connect Wallet</button>
        </div>
    )
}

export default Navbar