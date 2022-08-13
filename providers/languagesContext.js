import React, { createContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import messages_en from "../translations/en.json";
import messages_fr from "../translations/fr.json";
import messages_ko from "../translations/ko.json";

const messages = {
  en: messages_en,
  fr: messages_fr,
  ko: messages_ko,
};

export const LanguagesContext = createContext();

export const LanguagesProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  const changeLocaleTo = (locale) => {
    setLocale(locale);
  };

  //   useEffect(() => {
  //     // setLocale(navigator.language.split(/[-_]/)[0]);
  //   }, []);

  const values = { locale, changeLocaleTo };

  return (
    <LanguagesContext.Provider value={values}>
      <IntlProvider
        // messages={messages[locale]}
        // locale={locale}
        messages={messages["en"]}
        locale={"en"}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LanguagesContext.Provider>
  );
};
