import Image from "next/image";
import React from "react";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

function Steps(props) {
  const { type = "viewers" } = props;
  const intl = useIntl();

  const steps = {
    viewers: [
      {
        image: "/img/steps/connect-wallet.png",
        text: intl.formatMessage({ id: "steps.viewer.1" }),
      },
      {
        image: "/img/steps/connect-twitch.png",
        text: intl.formatMessage({ id: "steps.viewer.2" }),
      },
      {
        image: "/img/steps/watch-streamers.png",
        text: intl.formatMessage({ id: "steps.viewer.3" }),
      },
      {
        image: "/img/steps/earn-noom.png",
        text: intl.formatMessage({ id: "steps.viewer.4" }),
      },
    ],
    creators: [
      {
        image: "/img/steps/connect-wallet.png",
        text: intl.formatMessage({ id: "steps.creator.1" }),
      },
      {
        image: "/img/steps/connect-twitch.png",
        text: intl.formatMessage({ id: "steps.creator.2" }),
      },
      {
        image: "/img/steps/earn-noom.png",
        text: intl.formatMessage({ id: "steps.creator.3" }),
      },
    ],
  };

  return (
    <div className="py-20 bg-black/20">
      <div className="container mx-auto">
        <div className="lg:flex justify-center text-center">
          <div className="block lg:hidden">
            <h2 className="text-4xl font-bold leading-normal text-center mb-12">
              <FormattedMessage id="steps.title" />
            </h2>
          </div>
          {steps[type]?.map((item, index) => (
            <Step
              imageUrl={item.image}
              id={index + 1}
              key={`steps-${index}`}
              showArrow={index < steps[type].length - 1}
            >
              {item.text}
            </Step>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Steps;

const Step = (props) => {
  const { children, showArrow = true, imageUrl, id } = props;

  return (
    <motion.div
      className="relative bg-[#372e3a] rounded-lg lg:bg-transparent lg:rounded-none my-4 lg:my-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: [0.87, 0, 0.13, 1], delay: id / 4 }}
    >
      <div className="text-left lg:text-center">
        <div className="hidden lg:block">
          <Image src={imageUrl} width="364" height="291" />
        </div>
        <div className="lg:font-bold relative lg:-top-16 flex-inline items-center">
          <span className="lg:hidden">
            <div className="rounded-full  text-[#FF5FAC] border-2 border-[#FF5FAC] w-8 h-8 inline-flex justify-center items-center m-4 ">
              {id}
            </div>
          </span>
          <span>{children}</span>
        </div>
      </div>
      {showArrow && (
        <ArrowSmRightIcon
          className="absolute top-1/2 -right-4 text-white/20 hidden lg:block"
          width={30}
        />
      )}
    </motion.div>
  );
};
