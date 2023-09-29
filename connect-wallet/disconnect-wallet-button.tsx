import React from 'react'
import { jost } from '@/fonts/fonts'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import Modal from '@/components/modal'
import { useBoolean } from 'usehooks-ts'
import ConfettiEffect from '@/components/confetti-effect'

interface DisConnectWalletButtonProps {
    responsive?: boolean
}

const DisconnectWalletButton = ({ responsive }: DisConnectWalletButtonProps) => {
    const { disconnect } = useWallet()
    const { value: showConfetti, setFalse: onClose } = useBoolean(true)

    return (
        <>
            <button
                onClick={disconnect}
                className={`${responsive ? "hidden lg:block" : ""} bg-white text-700 text-12 py-1 px-4 whitespace-nowrap h-fit w-fit leading-30 font-bold ${jost.variable} font-jost hover:bg-300 transform transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:translate-z-[0.01px] hover:text800`}
            >
                Disconnect Wallet
            </button>
            {
                showConfetti && <ConfettiEffect duration={5000} onClose={onClose} />
            }



        </>

    )
}

export default DisconnectWalletButton