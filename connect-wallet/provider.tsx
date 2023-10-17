import { MartianWallet, } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter"
import {
    AptosWalletAdapterProvider,
} from "@aptos-labs/wallet-adapter-react";
import { FC, ReactNode } from "react";
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
        // onError={(error: any) => {
        //     console.log("Custom error handling", error);
        //     // setErrorAlertMessage(error);
        // }}
        >
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
