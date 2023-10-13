import { MartianWallet, } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter"
import {
    AptosWalletAdapterProvider, WalletName, useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { FC, ReactNode, useEffect } from "react";

const AutoConnectTrigger = () => {
    const { connected, connect } = useWallet()

    useEffect(() => {
        const f = async (retry: number) => {
            if (retry > 5) {
                return
            }
            const connectedWallet = localStorage.getItem('AptosWalletName')
            if (!connected && connectedWallet) {
                try {
                    // @ts-ignore
                    const account = await window?.aptos?.account?.()
                    // @ts-ignore
                    if (window?.aptos) {
                        connect(connectedWallet as WalletName)
                    }
                    f(retry + 1)
                } catch (error) {
                    console.log("🚀 ~ file: provider.tsx:22 ~ useEffect ~ error:", error)

                }
            }
        }
        f(0)

    }, [])
    return null
}
const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const { value: render, setTrue } = useBoolean(false)
    const wallets = [
        new PetraWallet(),
        new PontemWallet(),
        new MartianWallet(),
        new RiseWallet(),
        // new FewchaWallet()
    ];
    // useEffect(setTrue)

    // if (!render) {
    //     console.log("Hello");

    //     return null // auto connect purpose
    // }


    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            onError={(error: any) => {
                console.log("Custom error handling", error);
                // setErrorAlertMessage(error);
            }}
        >
            <AutoConnectTrigger />
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
