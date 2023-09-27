import React, { useEffect } from 'react'
import Navbar from './navbar'
import { mono } from '@/fonts/fonts'

const Layout = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.remove();
        }
    }, []);

    return (
        <div className={`${mono.variable} font-mono text-white pt-35 pl-46 pr-31.79 sm:pr-33.71 md:pr-42 lg:px-105`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
