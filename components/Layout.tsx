import React from 'react'
import { Roboto_Mono } from 'next/font/google'
import Navbar from './Navbar'

const mono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    weight: ['100', '200', '300', '400', '500', '600', '700'],
})

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${mono.variable} font-mono bg-noise text-white pt-35 px-46 lg:px-105`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout