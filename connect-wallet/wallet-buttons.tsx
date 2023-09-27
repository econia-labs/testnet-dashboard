import ArrowRightICon from "@/icons/arrow-right-icon";
import BridgeIcon from "@/icons/bridge-icon";
import {
    useWallet,
    WalletReadyState,
    Wallet,
    isRedirectable,
    WalletName,
} from "@aptos-labs/wallet-adapter-react";
import React, { useState } from 'react'

const WalletButtons = () => {

    const { wallets } = useWallet()

    return (
        <div className="w-full [&_button]:!mb-[19.83px]">
            {wallets.map((wallet: Wallet) => {
                return WalletView(wallet);
            })}
        </div>
    )
}
const WalletView = (wallet: Wallet) => {
    const { isLoading } = useWallet()
    const [connecting, setConnecting] = useState(false)
    console.log("🚀 ~ file: wallet-buttons.tsx:27 ~ WalletView ~ connecting:", connecting)

    const { connect } = useWallet();
    const isWalletReady =
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable;
    const mobileSupport = wallet.deeplinkProvider;

    const onWalletConnectRequest = async (walletName: WalletName) => {
        setConnecting(true)
        try {
            await connect(walletName);
            setConnecting(false)
        } catch (error: any) {
            setConnecting(false)
            // setErrorAlertMessage(error);
        }
    };

    /**
     * If we are on a mobile browser, adapter checks whether a wallet has a `deeplinkProvider` property
     * a. If it does, on connect it should redirect the user to the app by using the wallet's deeplink url
     * b. If it does not, up to the dapp to choose on the UI, but can simply disable the button
     * c. If we are already in a in-app browser, we dont want to redirect anywhere, so connect should work as expected in the mobile app.
     *
     * !isWalletReady - ignore installed/sdk wallets that dont rely on window injection
     * isRedirectable() - are we on mobile AND not in an in-app browser
     * mobileSupport - does wallet have deeplinkProvider property? i.e does it support a mobile app
     */
    if (!isWalletReady && isRedirectable()) {
        // wallet has mobile app
        if (mobileSupport) {
            return (
                <button
                    className={`${connecting && 'animate-fadeBorder '} animate-fadeBorder flex items-center gap-11.55 font-jost text-base font-medium group transition-colors relative w-full border border-600 text-500 px-11.53 py-[9.2px]  ${true ? "hover:border-blue" : "aaaa opacity-50 cursor-not-allowed"
                        }`}
                    disabled={false || isLoading}
                    key={wallet.name}
                    onClick={() => onWalletConnectRequest(wallet.name)}
                >
                    <div className={`${!isWalletReady && 'disabled'} group-hover:[&:not(.disabled)]:text-blue transition-colors text-600`}>
                        <BridgeIcon />
                    </div>

                    <span>{wallet.name} Wallet</span>

                    <div className={` ${!isWalletReady && 'disabled'} transition-colors group-hover:[&:not(.disabled)_svg]:-rotate-45 [&_svg]:transition-transform group-hover:[&:not(.disabled)]:bg-blue group-hover:[&:not(.disabled)]:border-blue border border-600 absolute right-[-1px] bottom-[-1px] p-[4.23px] w-fit h-fit`}>
                        <ArrowRightICon />
                    </div>
                </button>
            );
        }
        // wallet does not have mobile app
        return (
            <button
                className={`flex items-center gap-11.55 font-jost text-base font-medium group transition-colors relative w-full border border-600 text-500 px-11.53 py-[9.2px]  ${isWalletReady ? "hover:border-blue" : "aaaa opacity-50 cursor-not-allowed"
                    }`}
                disabled={isLoading}
                key={wallet.name}
            >
                <div className={`${!isWalletReady && 'disabled'} group-hover:[&:not(.disabled)]:text-blue transition-colors text-600`}>
                    <BridgeIcon />
                </div>

                <span>{wallet.name} Wallet</span>

                <div className={` ${!isWalletReady && 'disabled'} transition-colors group-hover:[&:not(.disabled)_svg]:-rotate-45 [&_svg]:transition-transform group-hover:[&:not(.disabled)]:bg-blue group-hover:[&:not(.disabled)]:border-blue border border-600 absolute right-[-1px] bottom-[-1px] p-[4.23px] w-fit h-fit`}>
                    <ArrowRightICon />
                </div>
            </button>
        );
    } else {
        // we are on desktop view
        return (
            <button
                className={` ${connecting && 'animate-fadeBorder '} flex items-center gap-11.55 font-jost text-base font-medium group transition-colors relative w-full border border-600 text-500 px-11.53 py-[9.2px]  ${isWalletReady ? "hover:border-blue" : "aaaa opacity-50 cursor-not-allowed"
                    }`}
                disabled={!isWalletReady || isLoading}
                key={wallet.name}
                onClick={() => onWalletConnectRequest(wallet.name)}
            >
                <div className={`${connecting && 'animate-fadeText '} ${!isWalletReady && 'disabled'} group-hover:[&:not(.disabled)]:text-blue transition-colors text-600`}>
                    <BridgeIcon />
                </div>

                <span>{wallet.name} Wallet</span>

                <div className={` ${!isWalletReady && 'disabled'} ${connecting && 'animate-fadeBg'} transition-colors group-hover:[&:not(.disabled)_svg]:-rotate-45 [&_svg]:transition-transform group-hover:[&:not(.disabled)]:bg-blue group-hover:[&:not(.disabled)]:border-blue border border-600 absolute right-[-1px] bottom-[-1px] p-[4.23px] w-fit h-fit`}>
                    <ArrowRightICon />
                </div>
            </button>
        );
    }
};

export default WalletButtons