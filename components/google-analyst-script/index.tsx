import Script from 'next/script'
import React from 'react'

const GoogleAnalystScript = () => {
    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z49C3PLGRN">
            </Script>
            <Script id="google-analytics">
                {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); gtag('config', 'G-Z49C3PLGRN');
            `}
            </Script>
        </>
    )
}

export default GoogleAnalystScript