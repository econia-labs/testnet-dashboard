import React from 'react'
import { jost } from '@/fonts/fonts'

interface ConnectWalletButtonProps {
    responsive?: boolean
}

const ConnectWalletButton = ({ responsive }: ConnectWalletButtonProps) => {
    return (
        <button
            className={`${responsive ? "hidden lg:block" : ""} bg-white text-800 text-12 py-1 px-4 whitespace-nowrap h-fit w-fit leading-30 font-bold ${jost.variable} font-jost`}
        >
            Connect Wallet
        </button>
    )
}

export default ConnectWalletButton