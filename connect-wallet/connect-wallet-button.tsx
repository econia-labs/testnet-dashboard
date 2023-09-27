import React from 'react'
import ConnectWalletModalBody from '@/connect-wallet/connect-wallet-modal-body'
import { jost } from '@/fonts/fonts'
import { useBoolean } from 'usehooks-ts'
import Modal from '@/components/modal'

interface ConnectWalletButtonProps {
    responsive?: boolean
}

const ConnectWalletButton = ({ responsive }: ConnectWalletButtonProps) => {
    const { value: openModal, setFalse: setClose, setTrue: setOpen } = useBoolean(false)

    return (
        <>
            <button
                onClick={setOpen}
                className={`${responsive ? "hidden lg:block" : ""} bg-white text-800 text-12 py-1 px-4 whitespace-nowrap h-fit w-fit leading-30 font-bold ${jost.variable} font-jost`}
            >
                Connect Wallet
            </button>
            <Modal
                className='md:w-1/2 lg:w-1/4'
                open={openModal}
                onClose={setClose}
            >
                <ConnectWalletModalBody />
            </Modal>
        </>

    )
}

export default ConnectWalletButton