import { MartianWallet, } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
// import { FewchaWallet } from "fewcha-plugin-wallet-adapter"
import {
    AptosWalletAdapterProvider, WalletName, useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { FC, ReactNode, useEffect } from "react";

let t: NodeJS.Timeout | null = null
const AutoConnect = () => {
    const { account, connect, ...res } = useWallet()
    useEffect(() => {
        if (!account && localStorage.getItem('AptosWalletName')) {
            const f = async () => {
                try {
                    await connect(localStorage.getItem('AptosWalletName') as WalletName)
                } catch (error) {
                    if (t) {
                        clearInterval(t)
                    }
                }
            }
            f()
            t = setInterval(f, 100)
        } else if (t) {
            clearInterval(t)
        }
        return () => {
            if (t) {
                clearInterval(t)
            }
        }
    }, [account])

    return null
}
const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const wallets = [
        new PetraWallet(),
        new PontemWallet(),
        new MartianWallet(),
        new RiseWallet(),
        // new FewchaWallet()
    ];

    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
        >
            <AutoConnect />
            {children}
        </AptosWalletAdapterProvider>
    );
};

const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        // <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
        // </AutoConnectProvider>

    );
};

export default Web3Provider
