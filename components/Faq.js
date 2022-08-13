import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";

const DATA = {
  viewers: [
    {
      title: "How can I earn NOOM tokens ?",
      description:
        "Link your wallet and your twitch account on the plaftorm and watch one of our partnered creator. It's that simple and it works on desktop and mobile. The more you watch a partnered creator the more NOOM tokens you earn.",
    },
    {
      title: "How often drops are generated ?",
      description:
        "You can expect an average of 3 drops per hour on our partnered creators. This can vary slightly as drops are generated randomly.",
    },
    {
      title: "What can I do with my NOOM tokens ?",
      description:
        "With your NOOM tokens you can buy a sub from our partnered creators or send it directly to their wallet as a donation. A Twitch add-on in currently in building for creator alerts.",
    },
    {
      title: "Is it free ?",
      description:
        "Yes. Using our platform and earning NOOM tokens is totally free of cost. A small network fee is required for claiming tokens (0.001 SOL)",
    },
  ],
  creators: [
    {
      title: "Who are eligible ?",
      description:
        "You need to be an active creator on Twitch since 6+ months and have an average viewer base no bigger than 500.",
    },
    {
      title: "How to become a partnered creator ?",
      description:
        "To become partnered creator you need to stake the minimum required NOOM tokens. As NOOM tokens are not available on the market you can fill out the partnered creator form above and we'll get back to you. Once you stake NOOM  tokens, Noomea's features will be automatically added to your channel and viewers can earn NOOM tokens right away.",
    },
    {
      title: "I'm not familiar with web3 technologies where can I learn ?",
      description: "Join our Discord, we'll be happy to help!",
    },
  ],
};

function Faq(props) {
  const { type } = props;

  if (!type) return;

  return (
    <div className="container mx-auto py-32 ">
      <div className="leading-normal text-center mb-12 flex flex-col-reverse lg:flex-row items-center justify-center">
        <h3 className="text-4xl font-bold">Questions from our community</h3>
        <span
          className={clsx(
            "text-xs rounded  text-white font-medium px-2 py-1 ml-4 mb-6 lg:mb-0",
            {
              ["from-[#ff439e] via-[#FF5FAC] to-[#FF909F] bg-gradient-to-r"]:
                type === "viewers",
              ["bg-[#5f8aff]"]: type === "creators",
            }
          )}
        >
          <FormattedMessage id={`menu.${type}`} />
        </span>
      </div>
      {DATA[type].map((item, index) => (
        <FaqItem
          title={item.title}
          description={item.description}
          key={`faq-${index}`}
        />
      ))}
    </div>
  );
}

export default Faq;

const FaqItem = (props) => {
  const { title, description } = props;

  return (
    <div className="mx-auto max-w-2xl text-lg border-t-2 border-white/10 py-8 text-left">
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button className="font-medium flex items-center w-full text-left">
              <div className="flex-1">{title}</div>
              <ChevronDownIcon
                className={clsx("h-8 w-8 text-white/40", {
                  ["rotate-180"]: open,
                })}
              />
            </Disclosure.Button>
            <Transition
              enter="transition-all duration-100 ease-out"
              enterFrom="opacity-0 h-0"
              enterTo="opacity-100 h-full"
              leave="transition-all ease-out"
              leaveFrom="opacity-100 h-full"
              leaveTo="opacity-0 h-0"
            >
              <Disclosure.Panel className="mt-4 text-white/50 pr-14">
                {description}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
