import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const LIMIT_NOOM_PER_DAY = 6;
export const LIMIT_TRANSACTIONS_PROFILE = 5;

const SOLANA_RPC_APIS = {
  mainnet: {
    name: WalletAdapterNetwork.Mainnet,
    url: "https://api.mainnet-beta.solana.com",
    tokenPubkey: "BLHYmqhVdyRChKFckAH4AjjQFkXrDqVwZQv7Vk9QB7A", // [Claim token] : Fee receiver
    tokenId: "8AxFH7RYhBHMVHdhKXKEQJpedv5S41BofwVb2oJ1LNxf", // TokenId
  },
  testnet: {
    name: WalletAdapterNetwork.Testnet,
    url: "https://api.testnet.solana.com",
  },
  devnet: {
    name: WalletAdapterNetwork.Devnet,
    url: "https://api.devnet.solana.com/",
    tokenPubkey: "Hyjq7QHkKxhvAp8KAPfBT9SjpstyE1Km6vgmZW7QGsnQ", // [Claim token] : Fee receiver
    tokenId: "9L2y2aYnSXWnUrj1ThttJ9i3SgT7JryN4QDswiqmbVeM", // TokenId
  },
};

export const SOLANA_RPC_API = SOLANA_RPC_APIS.mainnet;
