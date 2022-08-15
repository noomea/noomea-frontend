import React from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import Image from "next/image";

function HeaderHero(props) {
  return (
    <motion.div
      initial={{ opacity: 0, top: 20 }}
      whileInView={{ opacity: 1, top: 0 }}
      className="relative"
    >
      <div className="relative overflow-hidden">
        <div className="container mx-auto pb-20 lg:pb-40 pt-10 lg:pt-28">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold leading-normal text-center lg:text-left">
              <FormattedMessage id="viewer.header.title" />
            </h2>
            <div className="text-center mt-8 lg:hidden">
              <a
                href="https://solana.com"
                target="_blank"
                rel="noreferrer"
                className="bg-black/50 py-2 px-5 rounded-md text-xs inline-flex items-center hover:bg-black/90"
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
        </div>
        <div className="absolute -right-60 2xl:right-0 bottom-0 w-full h-full overflow-hidden hidden lg:block -z-10 ">
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 100 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0 }}
            className="absolute right-0 bottom-0 w-full h-full"
            style={{
              background: `url("./header/computer/floor-empty.svg") no-repeat 100% 100px`,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 100 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.2 }}
            className="absolute right-0 bottom-0 w-full h-full"
            style={{
              background: `url("./header/computer/floor-empty.svg") no-repeat 130% 20px`,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 60 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.4 }}
            className="absolute right-0 bottom-0 w-full h-full"
            style={{
              background: `url("./header/computer/computer-table.svg") no-repeat 110% 20px`,
            }}
          />
        </div>
        <div className="w-full absolute h-10 top-0 left-0 bg-gradient-to-b from-[#372e39] to-transparent lg:hidden"></div>
        <div className="w-full absolute h-28 bottom-0 left-0  bg-gradient-to-b to-[#2d252e] from-transparent lg:hidden"></div>
        <div className="absolute -bottom-20 -z-10 lg:hidden">
          <video
            src="https://static.videezy.com/system/resources/previews/000/005/089/original/Particle_Wave_4K_Motion_Background_Loop.mp4"
            autoPlay
            muted
            loop
            style={{
              filter: `hue-rotate(100deg) brightness(1.2)`,
              // height: "800px",
            }}
            className="max-w-screen-xl opacity-50"
          />
          <div className="w-full absolute h-36 top-0 left-0 bg-gradient-to-b from-[#372e39] to-transparent lg:hidden"></div>
          <div className="w-full absolute h-36 top-0 left-0 bg-gradient-to-b from-[#372e39] to-transparent lg:hidden"></div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeaderHero;
