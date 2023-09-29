import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { mono } from '@/fonts/fonts'
import Loader from './loader'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [animationFinished, setAnimationFinished] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationFinished(true)
        }, 3000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={`${mono.variable} font-mono text-white pt-35 pl-46 pr-31.79 sm:pr-33.71 md:pr-42 lg:px-105`}>
            <Loader animationFinished={animationFinished} />
            <Navbar />
            {children}
        </div>
    )
}

export default Layout