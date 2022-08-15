import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInViewport } from "react-in-viewport";
import CountUp from "react-countup";

import TextGradient from "./TextGradient";
import { getTokenSupply } from "../api/solanaRPC";
import { SOLANA_RPC_API } from "../variables";
import { useIntl } from "react-intl";

function DetailsSupply(props) {
  const [loaded, setLoaded] = useState(false);
  const [tokenSupply, setTokenSupply] = useState(0);

  const ref = useRef();
  const { inViewport } = useInViewport(ref, props);
  const intl = useIntl();

  const DATA = [
    {
      title: intl.formatMessage({ id: "supply.circulating" }),
      value: tokenSupply ? tokenSupply - 5000000 : 0,
    },
    { title: intl.formatMessage({ id: "supply.total" }), value: tokenSupply },
    { title: intl.formatMessage({ id: "supply.max" }), value: "--" },
    {
      title: intl.formatMessage({ id: "supply.marketcap" }),
      value: intl.formatMessage({ id: "supply.marketcap.value" }),
    },
    {
      title: intl.formatMessage({ id: "supply.minted_last_24h" }),
      value: "--",
    },
  ];

  const handleGetRPCDetails = async () => {
    const result = await getTokenSupply(SOLANA_RPC_API.tokenId);
    setTokenSupply(result?.data?.result?.value?.uiAmount);
    setLoaded(true);
  };

  useEffect(() => {
    if (!inViewport && !loaded) return;
    handleGetRPCDetails();
  }, [inViewport]);

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div
        className="container mx-auto border-white/10 border-t-4 py-16"
        ref={ref}
      >
        <div className="grid gap-12 grid-cols-2 lg:grid-cols-3 max-w-3xl">
          {DATA.map((item, index) => (
            <div key={index}>
              <div className="text-white/50 mb-2">{item.title}</div>
              <div className="font-bold text-lg">
                <TextGradient>
                  {typeof item.value === "string" ? (
                    item.value
                  ) : (
                    <>
                      <CountUp
                        end={item.value}
                        delay={2}
                        separator=","
                        duration={1}
                      />
                    </>
                  )}
                </TextGradient>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DetailsSupply;
