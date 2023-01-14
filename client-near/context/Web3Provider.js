"use client"

import { Contract } from "@/near-interface";
import { Wallet } from "@/near-wallet";
import { createContext, useContext, useEffect, useState } from "react";

export const Web3Context = createContext(null);

const CONTRACT_ID = process.env.CONTRACT_ID | "dev-1672541461312-41998318820713";

function Web3Provider({ children }) {

    const [web3, setWeb3] = useState({
        wallet: null,
        contract: null,
        isSignedIn: null,
    });

    useEffect(() => {

        const loadProvider = async () => {
            const wallet = await new Wallet({
                createAccessKeyFor: CONTRACT_ID,
                network: "testnet",
            });
            const contract = await new Contract({
                contractId: CONTRACT_ID,
                walletToUse: wallet
            });
            const isSignedIn = await wallet.startUp();
            setWeb3({
                wallet,
                contract,
                isSignedIn
            });
        };
        loadProvider();
    }, []);


    return (
        <Web3Context.Provider value={web3}>
            {children}
        </Web3Context.Provider>
    );
}

export const useWeb3 = () => {
    return useContext(Web3Context);
};

export default Web3Provider;