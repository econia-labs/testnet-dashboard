import Image from 'next/image'
import React from 'react'
import logo1 from '../public/logo1.svg';

const Navbar = () => {
    return (
        <div>
            <Image src={logo1} alt="logo" width={100} height={100} />
        </div>
    )
}

export default Navbar