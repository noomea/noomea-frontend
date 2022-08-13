import React from "react";

import { Web3Provider } from "./web3Context";
import { AppProvider } from "./appContext";
import { LanguagesProvider } from "./languagesContext";

function Providers(props) {
  const { children } = props;

  return (
    <Web3Provider>
      <AppProvider>
        <LanguagesProvider>{children}</LanguagesProvider>
      </AppProvider>
    </Web3Provider>
  );
}

export default Providers;
