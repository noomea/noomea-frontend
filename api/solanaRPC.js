import axios from "axios";
import { SOLANA_RPC_API } from "../variables";

export const getTokenSupply = async (tokenId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenSupply",
      params: [tokenId],
    };

    const result = await axios.post(SOLANA_RPC_API.url, data, config);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getTransaction = async (signature) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "getTransaction",
      params: [signature, "json"],
    };

    const result = await axios.post(SOLANA_RPC_API.url, data, config);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getTokenBalanceInWallet = async (publicKey) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenAccountsByOwner",
      params: [
        publicKey,
        {
          mint: SOLANA_RPC_API.tokenId,
        },
        {
          encoding: "jsonParsed",
        },
      ],
    };

    const result = await axios.post(SOLANA_RPC_API.url, data, config);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAmountFromTransaction = (signature) => {
  const amount =
    Math.round(
      (signature.meta.postTokenBalances[0].uiTokenAmount.uiAmount -
        signature.meta.preTokenBalances[0].uiTokenAmount.uiAmount) *
        10
    ) / 10;

  return amount;
};
