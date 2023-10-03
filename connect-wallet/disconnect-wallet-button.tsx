import React from 'react'
import { jost } from '@/fonts/fonts'
import Modal from '@/components/modal'
import { useBoolean } from 'usehooks-ts'
import ConfettiEffect from '@/components/confetti-effect'
import DisConnectWalletModalBody from './disconnect-wallet-modal-body'

interface DisConnectWalletButtonProps {
    responsive?: boolean
}

const DisconnectWalletButton = ({ responsive }: DisConnectWalletButtonProps) => {
    const { value: showConfetti, setFalse: onClose } = useBoolean(true)
    const { value: openModal, setFalse: setClose, setTrue: setOpen } = useBoolean(false)
    return (
        <>
            <button
                onClick={setOpen}
                className={`${responsive ? "hidden lg:block" : ""} bg-white text-700 text-12 py-1 px-4 whitespace-nowrap h-fit w-fit leading-30 font-bold ${jost.variable} font-jost hover:bg-300 transform transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:translate-z-[0.01px] hover:text800`}
            >
                Disconnect Wallet
            </button>
            {
                showConfetti && <ConfettiEffect duration={2000} onClose={onClose} />
            }
            <Modal
                className='!w-[425.6577px]'
                open={openModal}
                onClose={setClose}
            >
                <DisConnectWalletModalBody />
            </Modal>
        </>

    )
}

export default DisconnectWalletButton