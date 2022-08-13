import { Menu, Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React, { Fragment, useContext, useState } from "react";
import { useIntl } from "react-intl";

import { languages } from "../colors";
import { LanguagesContext } from "../providers/languagesContext";

function LanguageSelect(props) {
  const [showMenu, setShowMenu] = useState(false);
  const intl = useIntl();
  const { changeLocaleTo } = useContext(LanguagesContext);

  return (
    <Menu as="div" className="relative inline-block text-left cursor-pointer">
      <div
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <GlobeAltIcon className="h-5 w-5" />
        <Transition
          as={Fragment}
          show={showMenu}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-75"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-75"
        >
          <Menu.Items className="origin-top text-center absolute z-10  left-1/2 transform -translate-x-1/2 mt-2 w-32 rounded-md shadow-lg bg-[#2c252e] ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
            {languages.map((language, index) => (
              <Menu.Item key={`language-${index}`}>
                <div
                  onClick={() => changeLocaleTo(language.short)}
                  className={clsx(
                    `text-gray-400 hover:text-white transition-all cursor-pointer p-1`,
                    { ["text-white"]: language.short === intl.locale }
                  )}
                >
                  {language.name}
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
}

export default LanguageSelect;
