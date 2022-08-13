import React, { useContext } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { push as Menu } from "react-burger-menu";
import { FormattedMessage } from "react-intl";

import { AppContext } from "../providers/appContext";
import { HEADER_LINKS_DATA } from "./HeaderMenu";
import { WalletConnect } from "./WalletConnect";

function MenuMobile(props) {
  const { isMobileMenuOpen, toggleMobileMenu } = useContext(AppContext);
  const route = useRouter();
  const activeLink = HEADER_LINKS_DATA.find(
    (link) => link.page === route.pathname
  );

  return (
    <Menu
      right
      isOpen={isMobileMenuOpen}
      customBurgerIcon={false}
      onClose={toggleMobileMenu}
      className="bg-[#1a161b] p-8 overflow-hidden flex h-full"
      {...props}
    >
      <div className="text-center">
        <Image src="/noomea-logo.svg" width="140" height="60" />
      </div>
      <div className="flex-1 flex-col !flex">
        {HEADER_LINKS_DATA.map((link, index) => {
          if (!link.menu.includes("mobile")) return;
          if (!link.page) return;

          return (
            <Link key={index} href={link.page}>
              <a
                className={clsx(`px-5 py-3 rounded my-1 font-bold text-sm`, {
                  ["bg-[#372e3a]/40 text-[#FF5FAC]"]:
                    link?.id === activeLink?.id,
                })}
              >
                {link.name && <FormattedMessage id={link.name} />}
              </a>
            </Link>
          );
        })}
      </div>
      <div>
        <WalletConnect />
      </div>
    </Menu>
  );
}

export default MenuMobile;
