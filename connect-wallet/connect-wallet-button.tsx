import React, { useEffect } from 'react'
import ConnectWalletModalBody from '@/connect-wallet/connect-wallet-modal-body'
import { jost } from '@/fonts/fonts'
import { useBoolean } from 'usehooks-ts'
import Modal from '@/components/modal'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import ConfettiEffect from '@/components/confetti-effect'

interface ConnectWalletButtonProps {
    responsive?: boolean
}

const ConnectWalletButton = ({ responsive }: ConnectWalletButtonProps) => {
    const { value: openModal, setFalse: setClose, setTrue: setOpen } = useBoolean(false)
    return (
        <>
            <button
                onClick={setOpen}
                className={`${responsive ? "hidden lg:block" : ""} bg-white text-700 text-12 py-1 px-4 whitespace-nowrap h-fit w-fit leading-30 font-bold ${jost.variable} font-jost hover:bg-300 transform transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:translate-z-[0.01px] hover:text800`}
            >
                Connect Wallet
            </button>

            <Modal
                className='!w-599.21'
                open={openModal}
                onClose={setClose}
            >
                <ConnectWalletModalBody />
            </Modal>
        </>

    )
}

export default ConnectWalletButton