import React, { createContext, useEffect, useState } from "react";

import { getQuickQueryInfos } from "../api/firebase";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [partneredCreators, setPartneredCreators] = useState([]);
  const [onlinePartneredCreators, setOnlinepartneredCreators] = useState([]);
  const [totalDrop, setTotalDrop] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((x) => !x);
  };

  const fetchQuickQueryInfos = async () => {
    const result = await getQuickQueryInfos();
    setTotalDrop(Math.round(result.totalDrop * 10) / 10);
  };

  useEffect(() => {
    fetchQuickQueryInfos();
  }, []);

  const values = {
    isMobileMenuOpen,
    toggleMobileMenu,
    partneredCreators,
    setPartneredCreators,
    onlinePartneredCreators,
    setOnlinepartneredCreators,
    totalDrop,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
