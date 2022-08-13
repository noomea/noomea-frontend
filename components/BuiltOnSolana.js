import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

function BuiltOnSolana(props) {
  return (
    <div className="px-24 mx-auto justify-end hidden lg:flex">
      <div className="fixed bottom-0">
        <a
          href="https://solana.com"
          target="_blank"
          rel="noreferrer"
          className="bg-black/50 py-2 px-5 rounded-t-md text-xs flex items-center hover:bg-black/90"
        >
          <span>
            <FormattedMessage id="built_on_solana" />
          </span>
          <div className="ml-2 mr-1">
            <Image src="/solana-logo.svg" width="80" height="20" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default BuiltOnSolana;
