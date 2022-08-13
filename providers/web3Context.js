import React, { createContext, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import { SOLANA_RPC_API } from "../variables";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const network = SOLANA_RPC_API.name;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  const values = {};

  return (
    <Web3Context.Provider value={values}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </Web3Context.Provider>
  );
};
