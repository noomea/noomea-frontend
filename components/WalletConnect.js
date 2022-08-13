import React, { useEffect, useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import { FormattedMessage, useIntl } from "react-intl";

import ButtonGradient from "./ButtonGradient";
import { Spinner } from "./Spinner";
import WalletConnected from "./WalletConnected";

export const WalletConnect = () => {
  const { connecting, connected, select, publicKey, wallets } = useWallet();
  const intl = useIntl();
  const [walletInstalled, setWalletInstalled] = useState(true);

  const firstWallet = wallets[0];

  useEffect(() => {
    const walletAvailable = firstWallet?.readyState === "Installed";
    setWalletInstalled(Boolean(walletAvailable));

    if (!walletAvailable) return;
    select("Phantom");
  }, [firstWallet]);

  const handleClick = () => {
    select("Phantom");
  };

  if (!walletInstalled) {
    return <WalletNotInstalled />;
  }

  return (
    <>
      {connected ? (
        <WalletConnected address={publicKey} />
      ) : (
        <ButtonGradient
          onClick={handleClick}
          classNameProp={clsx({
            ["pointer-events-none opacity-50"]: connecting,
          })}
        >
          {connecting ? (
            <Spinner text={intl.formatMessage({ id: "wallet.loading" })} />
          ) : (
            <FormattedMessage id="button.connect_wallet" />
          )}
        </ButtonGradient>
      )}
    </>
  );
};

const WalletNotInstalled = () => {
  return (
    <div className="text-xs px-6 py-2.5 bg-[#4e44ce] rounded flex items-center space-x-2">
      <ExclamationIcon className="h-5 w-5" />
      <span>
        <FormattedMessage id="wallet.not_available" />
      </span>
    </div>
  );
};
