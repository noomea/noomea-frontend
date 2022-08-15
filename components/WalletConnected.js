import { Menu, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import React, { forwardRef, Fragment, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { createUser } from "../api/firebase";
import { getTokenBalanceInWallet } from "../api/solanaRPC";
import { convertBalance, displayAddress, displayFullAddress } from "../utils";

function WalletConnected(props) {
  const { address } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [balance, setBalance] = useState({ solana: 0, noomea: 0 });

  const { connected, disconnect, publicKey } = useWallet();
  const { connection } = useConnection();
  const intl = useIntl();

  const handleDisconnect = () => {
    disconnect();
    setShowMenu(false);
  };

  const handleCopyToClipboad = () => {
    navigator.clipboard.writeText(publicKey);
    setCopiedToClipboard(true);

    setTimeout(function () {
      setCopiedToClipboard(false);
    }, 2000);
  };

  const getTokenBalances = async (publicKey) => {
    const noomBalance = await getTokenBalanceInWallet(publicKey);
    const solBalance = await connection.getBalance(publicKey);

    setBalance({
      solana: convertBalance(solBalance),
      noomea:
        Math.round(
          noomBalance?.data?.result?.value[0]?.account?.data?.parsed?.info
            ?.tokenAmount?.uiAmount * 100000
        ) / 100000,
    });
  };

  useEffect(() => {
    getTokenBalances(publicKey);
    createUser(address);
  }, []);

  useEffect(() => {
    localStorage.setItem("walletAddress", displayFullAddress(publicKey));
  }, [publicKey]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        onMouseEnter={() => connected && setShowMenu(true)}
        onMouseLeave={() => connected && setShowMenu(false)}
      >
        <div className="pb-2 -mb-2">
          <button
            className={`inline-block font-bold rounded-lg px-7 py-3 text-xs bg-black/30 cursor-pointer group hover:bg-black/20`}
          >
            <div className="group-active:scale-90 relative transition-all flex items-center">
              <span>
                <FormattedMessage id="wallet.connected" />
              </span>
              <span className="ml-2 mr-2 text-gray-500">
                ({displayAddress(address)})
              </span>
              <ChevronDownIcon className="text-white" width={24} />
            </div>
          </button>
        </div>
        <Transition
          as={Fragment}
          show={showMenu}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-75"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-75"
        >
          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-[#2c252e] ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
            <div className="p-3 pb-6 flex items-center space-x-4">
              <div className="font-bold text-lg">
                {displayAddress(publicKey)}
              </div>
              <button
                className="rounded-full py-1 px-2 bg-white/20 text-xs text-white/40 active:opacity-50 flex items-center space-x-1"
                onClick={handleCopyToClipboad}
              >
                <span>
                  <FormattedMessage id="wallet.copy_address" />
                </span>

                {copiedToClipboard && <CheckIcon className="w-4 h-4" />}
              </button>
            </div>
            <div className="border-y border-white/20 py-3 mb-3 text-white/50 text-sm px-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>SOL</span>
                <span>{balance.solana || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NOOM</span>
                <span>{balance.noomea || 0}</span>
              </div>
            </div>
            <Menu.Item>
              <MyLink
                Icon={<UserCircleIcon width={20} />}
                text={intl.formatMessage({ id: "wallet.profile" })}
                href="/profile"
              />
            </Menu.Item>
            <Menu.Item>
              <div
                className="px-6 py-3 text-sm hover:bg-white/5 rounded flex space-x-4 transition-all cursor-pointer"
                onClick={handleDisconnect}
              >
                <div className="text-white/20">
                  <LogoutIcon width={20} />
                </div>
                <span>
                  <FormattedMessage id="wallet.disconnect" />
                </span>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
}

export default WalletConnected;

const MyLink = forwardRef((props, ref) => {
  let { href, Icon, text, children, ...rest } = props;

  return (
    <Link href={href}>
      <a
        ref={ref}
        className="px-6 py-3 text-sm hover:bg-white/5 rounded flex space-x-4 transition-all"
        {...rest}
      >
        <div className="text-white/20">{Icon}</div>
        <span>{text}</span>
      </a>
    </Link>
  );
});
