import React from 'react'
import WalletButtons from './wallet-buttons'
import { jost } from '@/fonts/fonts'

const ConnectWalletModalBody = () => {
    return (
        <div className={`px-8 pt-12 lg:px-[69.76px] pb-8 lg:pb-[57.14px] lg:pt-[39.62px]  ${jost.variable}`}>
            <h1 className='text-white font-bold text-32 leading-52 text-center font-jost'>Connect a Wallet</h1>
            <p className='text-center text-14 font-light mb-42'>In order to use this site you must connect a wallet and allow the site to access your account.</p>
            <WalletButtons />
        </div>
    )
}

export default ConnectWalletModalBody