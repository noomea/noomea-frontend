import React from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";

const roadmap = [
  {
    title: "Q3 - 2022",
    items: [
      {
        status: "done",
        text: "Alpha stage : working product for Solana Hackathon",
      },
      {
        status: "done",
        text: "Allow users to claim tokens",
      },
      {
        status: "done",
        text: "Switch to Mainnet Solana RPC",
      },
      {
        status: "done",
        text: "Market on SERUM (NOOM/USDC)",
      },
      {
        status: "pending",
        text: "First partnered creator",
      },
      {
        status: "pending",
        text: "Gitbook documentation",
      },
    ],
  },
  {
    title: "Q4 - 2022",
    items: [
      {
        status: "pending",
        text: "Allow users to use tokens",
      },
      {
        status: "pending",
        text: "Store feature release",
      },
      {
        status: "pending",
        text: "Onboard investors",
      },
      {
        status: "pending",
        text: "Onboard new creators",
      },
      {
        status: "pending",
        text: "Allow creators to join the plaftorm by stacking NOOM tokens",
      },
    ],
  },
  {
    title: "Q1 - 2023",
    items: [
      {
        status: "pending",
        text: "Research and improve after viewers and creators feedbacks",
      },
      {
        status: "pending",
        text: "Add NFTs in Store opening packs",
      },
      {
        status: "pending",
        text: "Add NFT utility (boost earning, increase daily limit,..)",
      },
    ],
  },
  {
    title: "Q2 - 2023",
    items: [
      {
        status: "pending",
        text: "Listing on major exchanges",
      },
    ],
  },
];

function Roadmap(props) {
  return (
    <motion.div
      initial={{ opacity: 0, top: 20 }}
      whileInView={{ opacity: 1, top: 0 }}
      className="relative"
    >
      <div className="py-32 bg-black/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold leading-normal text-center mb-24">
            Roadmap
          </h2>
          <div className="flex flex-wrap -m-4">
            {roadmap.map((item, index) => (
              <div
                className="p-4 lg:w-1/4 sm:w-1/2 w-full mb-8 lg:mb-0"
                key={`roadmap-${index}`}
              >
                <h2 className="font-medium title-font tracking-widest text-white mb-8 text-sm text-center sm:text-left border-l-2 border-l-pink-500 pl-4">
                  {item.title}
                </h2>
                <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                  {item.items.map((item, index) => (
                    <div
                      className="inline-flex items-start"
                      key={`step-item-${item.text}-${index}`}
                    >
                      {item.status === "done" ? (
                        <>
                          <CheckCircleIcon className="h-5 w-5 text-pink-500 mr-2 relative top-0.5" />
                          <span className="text-white/80 flex-1">
                            {item.text}
                          </span>
                        </>
                      ) : (
                        <>
                          <ExclamationIcon className="h-5 w-5 text-yellow-500 mr-2 relative top-0.5" />
                          <span className="text-white/30 flex-1">
                            {item.text}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Roadmap;
