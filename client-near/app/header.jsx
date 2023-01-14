"use client"

import { useWeb3 } from "@/context/Web3Provider"

const Header = () => {
    const { wallet, isSignedIn } = useWeb3();
    console.log(wallet);
    return (
        <div>
            {isSignedIn ? (
                <>
                <button>{wallet.accountId}</button>
                <button onClick={() => wallet.signOut()}>Sign Out</button>
                </>
            ) : (
                <button onClick={() => wallet.signIn()}>Connect</button>
            )}

        </div>
    )
}

export default Header