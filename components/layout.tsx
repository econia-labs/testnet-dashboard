import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { mono, jost } from '@/fonts/fonts'
import Loader from './loader'
import Maintenance from './maintenance'
import { healthCheck } from '@/services/axiosSetup'
const MAX_RETRY = 2
enum Status {
    IDLE = 'IDLE', ONLINE = 'ONLINE', MAINTAINED = 'MAINTAINED'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    const [animationFinished, setAnimationFinished] = useState(false);
    const [loaderShow, setLoaderShow] = useState(true);
    const [status, setStatus] = useState<Status>(Status.IDLE)

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

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_BACKEND_EXPECTED_ONLINE === 'false') {
            setStatus(Status.MAINTAINED)
        } else {
            const f = async (retry: number) => {
                if (retry > MAX_RETRY) {
                    return
                }
                try {
                    const heath = await healthCheck()
                    if (heath.status === 200) {
                        setStatus(Status.ONLINE)
                    }

                } catch (error) {
                    setStatus(Status.MAINTAINED)
                    f(retry + 1)
                }
            }
            f(0)
        }

    }, [])

    return (
        <div>
            <style jsx global>{`
                :root {
                  --font-jost: ${jost.style.fontFamily};
                  --font-mono: ${mono.style.fontFamily};
                }
                
              `}</style>
            <div className={`${mono.variable} font-mono text-white pt-35 pl-46 pr-31.79 sm:pr-33.71 md:pr-42 lg:px-105`}>
                {loaderShow && <Loader animationFinished={animationFinished} />}
                {
                    status === Status.ONLINE && (
                        <>
                            <Navbar />
                            {children}
                        </>
                    )
                }
                {
                    status === Status.MAINTAINED && (
                        <Maintenance />
                    )
                }
            </div>
        </div>

    )
}

export default Layout