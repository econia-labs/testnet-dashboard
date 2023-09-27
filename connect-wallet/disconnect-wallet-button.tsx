import React from 'react'
import ConnectWalletModalBody from '@/connect-wallet/connect-wallet-modal-body'
import { jost } from '@/fonts/fonts'
import { useBoolean } from 'usehooks-ts'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

interface DisConnectWalletButtonProps {
    responsive?: boolean
}

const DisconnectWalletButton = ({ responsive }: DisConnectWalletButtonProps) => {
    const { disconnect } = useWallet()
    return (
        <>
            <button
                onClick={disconnect}
                className={`${responsive ? "hidden lg:block" : ""} bg-white text-800 text-12 py-1 px-4 whitespace-nowrap h-fit w-fit leading-30 font-bold ${jost.variable} font-jost`}
            >
                Disconnect Wallet
            </button>

        </>

    )
}

export default DisconnectWalletButton