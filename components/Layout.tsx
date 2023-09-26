import React from 'react'
import Navbar from './Navbar'
import { mono } from '@/fonts/fonts'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`page ${mono.variable} font-mono bg-noise text-white pt-35 px-46 lg:px-105`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout