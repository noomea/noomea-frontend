import React, { useContext } from "react";
import { MenuAlt4Icon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

import { AppContext } from "../providers/appContext";
import HeaderLinks from "./HeaderLinks";
import LanguageSelect from "./LanguageSelect";
import { WalletConnect } from "./WalletConnect";

export const HEADER_LINKS_DATA = [
  {
    id: 1,
    name: "menu.viewers",
    page: "/",
    menu: ["desktop", "mobile"],
  },
  {
    id: 2,
    name: "menu.creators",
    page: "/creators",
    menu: ["desktop", "mobile"],
  },
  {
    id: 3,
    type: "separator",
    menu: ["desktop"],
  },
  {
    id: 4,
    name: "menu.store",
    menu: ["desktop", "mobile"],
  },
  {
    id: 5,
    name: "menu.profile",
    page: "/profile",
    menu: ["mobile"],
  },
];

function HeaderMenu(props) {
  const { toggleMobileMenu } = useContext(AppContext);

  return (
    <div className="px-6 lg:px-24 mx-auto my-5 lg:my-10">
      <div className="flex flex-row items-center">
        <div className="flex-1">
          <Link href="/">
            <div className="inline-block group relative cursor-pointer">
              <div className="group-active:scale-90 transition-all">
                <Image src="/noomea-logo.svg" width="140" height="60" />
              </div>
            </div>
          </Link>
        </div>

        <div className="lg:hidden inline-flex">
          <MenuAlt4Icon
            className="h-12 w-12 active:bg-white/20 rounded-full p-2"
            onClick={toggleMobileMenu}
          />
        </div>

        <div className="hidden lg:inline-flex">
          <div className="ml-20">
            <HeaderLinks links={HEADER_LINKS_DATA} />
          </div>

          <div className="ml-16 mr-6 flex items-center">
            <div className="">
              <LanguageSelect />
            </div>
          </div>

          <WalletConnect />
        </div>
      </div>
    </div>
  );
}

export default HeaderMenu;
