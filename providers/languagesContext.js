import React, { createContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import messages_en from "../translations/en.json";
import messages_fr from "../translations/fr.json";
import messages_ko from "../translations/ko.json";

const messages = {
  en: messages_en,
  fr: messages_fr,
  // ko: messages_ko,
};

export const LanguagesContext = createContext();

export const LanguagesProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  const changeLocaleTo = (locale) => {
    setLocale(locale);
  };

  const values = { locale, changeLocaleTo };

  return (
    <LanguagesContext.Provider value={values}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LanguagesContext.Provider>
  );
};
