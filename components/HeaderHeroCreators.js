import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

function HeaderHeroCreators(props) {
  return (
    <motion.div
      initial={{ opacity: 0, top: 20 }}
      whileInView={{ opacity: 1, top: 0 }}
      className="relative"
    >
      <div className="container mx-auto pb-20 lg:pb-30 pt-10">
        <div style={{ maxWidth: 1024 }} className="mx-auto">
          <h2 className="text-4xl font-bold leading-normal text-center mb-12 px-12">
            <FormattedMessage id="creator.header.title" />
          </h2>
          <div className="flex justify-between items-center flex-col-reverse lg:flex-row lg:space-x-8">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold leading-normal">
                <FormattedMessage id="creator.header.subtitle" />
              </h3>
              <p className="text-white/50 mt-4">
                <FormattedMessage id="creator.header.description" />
              </p>
            </div>
            <div>
              <Image
                src="/header/header-creators.png"
                width="655"
                height="344"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-white/40 mb-4">
            <FormattedMessage id="creator.header.integrates_with" />
          </p>
          <Image src="/img/logos/twitch.svg" width="98" height="32" />
        </div>
      </div>
    </motion.div>
  );
}

export default HeaderHeroCreators;
