import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

import ButtonGradient from "./ButtonGradient";
import TextGradient from "./TextGradient";

function DetailsGeneral(props) {
  const intl = useIntl();

  return (
    <div className="container mx-auto py-20 border-white/10 border-t-4">
      <div className="flex justify-between">
        <div>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-normal">
              <TextGradient>NOOM</TextGradient>{" "}
              <FormattedMessage id="details.title" />
            </h2>
            <p className="text-white/40 mb-14 mt-4">
              <FormattedMessage id="details.description" />
            </p>
          </div>
          <div className="flex space-x-10 items-center">
            <a
              href="https://raydium.io/swap/?ammId=4eJCwHbLomqYJy8S93y5Lawr9PPTzk65wZYs34bDGjaX"
              target="_blank"
            >
              <ButtonGradient>
                <FormattedMessage id="details.button.buy" />
              </ButtonGradient>
            </a>

            <div className="font-bold text-sm cursor-pointer group hover:opacity-70 p-2">
              <div className="group-active:scale-90 relative transition-all">
                <a
                  href="https://solscan.io/token/8AxFH7RYhBHMVHdhKXKEQJpedv5S41BofwVb2oJ1LNxf#metadata"
                  target="_blank"
                >
                  <TextGradient>
                    <FormattedMessage id="details.button.details" />
                  </TextGradient>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: [0.17, 0.67, 0.83, 0.67],
                }}
              >
                <Image
                  src="/img/noomea-glass/noomea-logo-glass-back.png"
                  width="230"
                  height="282"
                />
              </motion.div>
              <div className="absolute left-0 top-0">
                <motion.div
                  animate={{ y: [-33, -15, -33] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  className="ml-2"
                >
                  <Image
                    src="/img/noomea-glass/noomea-logo-glass-front.png"
                    width="230"
                    height="282"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DetailsGeneral;
