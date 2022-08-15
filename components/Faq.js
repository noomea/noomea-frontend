import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { FormattedMessage, useIntl } from "react-intl";

function Faq(props) {
  const { type } = props;
  if (!type) return null;

  const intl = useIntl();
  const DATA = {
    viewers: [
      {
        title: intl.formatMessage({ id: "faq.viewer.1.title" }),
        description: intl.formatMessage({ id: "faq.viewer.1.description" }),
      },
      {
        title: intl.formatMessage({ id: "faq.viewer.2.title" }),
        description: intl.formatMessage({ id: "faq.viewer.2.description" }),
      },
      {
        title: intl.formatMessage({ id: "faq.viewer.3.title" }),
        description: intl.formatMessage({ id: "faq.viewer.3.description" }),
      },
      {
        title: intl.formatMessage({ id: "faq.viewer.4.title" }),
        description: intl.formatMessage({ id: "faq.viewer.4.description" }),
      },
    ],
    creators: [
      {
        title: intl.formatMessage({ id: "faq.creator.1.title" }),
        description: intl.formatMessage({ id: "faq.creator.1.description" }),
      },
      {
        title: intl.formatMessage({ id: "faq.creator.2.title" }),
        description: intl.formatMessage({ id: "faq.creator.2.description" }),
      },
      {
        title: intl.formatMessage({ id: "faq.creator.3.title" }),
        description: intl.formatMessage({ id: "faq.creator.3.description" }),
      },
    ],
  };

  return (
    <div className="container mx-auto py-32 ">
      <div className="leading-normal text-center mb-12 flex flex-col-reverse lg:flex-row items-center justify-center">
        <h3 className="text-4xl font-bold">
          <FormattedMessage id="faq.title" />
        </h3>
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
