import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { mono } from '@/fonts/fonts'
import Loader from './loader'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [animationFinished, setAnimationFinished] = useState(false);
    const [loaderShow, setLoaderShow] = useState(true);

    useEffect(() => {
        const animationTimer = setTimeout(() => {
            setAnimationFinished(true)
        }, 3000);
        const loaderTimer = setTimeout(() => {
            setLoaderShow(false)
        }, 5000);
        return () => {
            clearTimeout(animationTimer);
            clearTimeout(loaderTimer);
        }
    }, [])

    return (
        <div className={`${mono.variable} font-mono text-white pt-35 pl-46 pr-31.79 sm:pr-33.71 md:pr-42 lg:px-105`}>
            {loaderShow && <Loader animationFinished={animationFinished} />}
            <Navbar />
            {children}
        </div>
    )
}

export default Layout