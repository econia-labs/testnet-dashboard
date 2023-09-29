import React, { useEffect, useState } from 'react'
import { jost } from '@/fonts/fonts'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import AccountIcon from '@/icons/account.svg'
import PontemIcon from '@/icons/pontem.svg'
import Image from 'next/image'
import CopyIcon from '@/icons/copy-icon'

const CopyButton = ({ value }: { value?: string }) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        let timer: null | NodeJS.Timeout = null
        if (copied) {
            timer = setTimeout(() => setCopied(false), 5000)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [copied])

    const onCopy = () => {
        setCopied(true)
        if (value) {
            navigator.clipboard.writeText(value)
        }

    }
    return (
        <button onClick={onCopy} className={`relative text-600 ${copied && 'text-blue'} border-0 outline-none cursor-pointer flex-shrink-0 hover:text-blue transition-colors`}>
            <CopyIcon />
            {copied && (
                <div className="rounded absolute text-12 bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2 text-white bg-800 shadow-400 p-1">
                    Copied!
                </div>
            )}
        </button>
    )
}
const DisConnectWalletModalBody = () => {
    const { account, wallet, disconnect } = useWallet()

    return (
        <div className={`px-8 pt-12 lg:px-[57.2px] pb-8 lg:pb-[39.27px] lg:pt-[24px]  ${jost.variable}`}>
            <h1 className='text-white font-bold text-20 leading-52 text-center font-jost mb-[23.79px]'>Connect Wallet</h1>

            <div className='pb-[27.49px]'>
                <div className="border border-600 border-b-0 flex gap- items-center [&_svg]:scale-[1.148] px-[14.43px] gap-16 h-[56.904px] py-[12.95px]">
                    <Image alt='' width={31} height={31} src={PontemIcon} className='w-[31px] h-[31px] flex-shrink-0' />
                    <div className="grow text-16 text-white">
                        {wallet?.name} Wallet
                    </div>
                </div>
                <div className="border border-600 flex gap- items-center [&_svg]:scale-[1.148] px-[14.43px] gap-16 h-[56.904px] py-[12.95px]">
                    <Image alt='' width={31} height={31} src={AccountIcon} className='w-[31px] h-[31px] flex-shrink-0' />
                    <div className="flex items-center grow gap-[8.69px]">
                        <div className='!grow'>
                            <p className={`text-12 text-500 leading-[1] mb-[7px] ${jost.variable} font-jost `}>Account Address</p>
                            <div className='text-12 w-full max-w-full text-white leading-[1] truncate'>{account?.address.slice(0, 13)}...{account?.address.slice(-13)}</div>
                        </div>
                        <CopyButton value={account?.address} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={disconnect}
                    className={` mx-auto inline py-[9px] px-[17.5px] bg-white tracking-[0.32px] uppercase text-800 text-16 whitespace-nowrap h-fit w-fit leading-18  font-bold hover:bg-300 transform transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:translate-z-[0.01px] hover:text800`}
                >
                    Disconnect
                </button>
            </div>
        </div>
    )
}

export default DisConnectWalletModalBody