import React from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useIntl } from "react-intl";

function Roadmap(props) {
  const intl = useIntl();

  const roadmap = [
    {
      title: "Q3 - 2022",
      items: [
        {
          status: "done",
          text: intl.formatMessage({ id: "roadmap.q3_2022.1" }),
        },
        {
          status: "done",
          text: intl.formatMessage({ id: "roadmap.q3_2022.2" }),
        },
        {
          status: "done",
          text: intl.formatMessage({ id: "roadmap.q3_2022.3" }),
        },
        {
          status: "done",
          text: intl.formatMessage({ id: "roadmap.q3_2022.4" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q3_2022.5" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q3_2022.6" }),
        },
      ],
    },
    {
      title: "Q4 - 2022",
      items: [
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q4_2022.1" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q4_2022.2" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q4_2022.3" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q4_2022.4" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q4_2022.5" }),
        },
      ],
    },
    {
      title: "Q1 - 2023",
      items: [
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q1_2023.1" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q1_2023.2" }),
        },
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q1_2023.3" }),
        },
      ],
    },
    {
      title: "Q2 - 2023",
      items: [
        {
          status: "pending",
          text: intl.formatMessage({ id: "roadmap.q2_2023.1" }),
        },
      ],
    },
  ];

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
