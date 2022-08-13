import { useMemo } from "react";

export const displayAddress = (publicKey) => {
  const base58 = publicKey?.toBase58();
  return base58.slice(0, 4) + ".." + base58.slice(-4);
};

export const displayFullAddress = (publicKey) => {
  const base58 = publicKey?.toBase58();
  return base58;
};

export const convertBalance = (balance) => {
  const displayBalance = (balance / 1000000000).toFixed(5);
  return Number(displayBalance);
};
