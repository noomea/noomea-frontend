import React, { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import clsx from "clsx";

import {
  getOnlinePartneredCreators,
  getPartneredCreators,
} from "../api/firebase";
import TextGradient from "./TextGradient";
import { FormattedMessage } from "react-intl";
import { AppContext } from "../providers/appContext";

function HeaderInfos(props) {
  const {
    partneredCreators,
    onlinePartneredCreators,
    setPartneredCreators,
    setOnlinepartneredCreators,
    totalDrop,
  } = useContext(AppContext);

  const DATA = [
    {
      title: "header.infos.partnered_creators",
      value: partneredCreators?.length || "--",
      submenu: true,
    },
    {
      title: "header.infos.online",
      value: onlinePartneredCreators?.length || 0,
    },
    {
      title: "header.infos.airdropped",
      value: totalDrop,
    },
    // {
    //   title: "header.infos.today",
    //   value: "--",
    // },
  ];

  const handleGetPartneredCreators = async () => {
    const creators = await getPartneredCreators();
    setPartneredCreators(creators);

    const onlineCreators = await getOnlinePartneredCreators(creators);
    setOnlinepartneredCreators(onlineCreators);
  };

  useEffect(() => {
    handleGetPartneredCreators();
  }, []);

  return (
    <div className="text-gray-400 text-sm bg-black/20 vwrap relative">
      <div className="vmove lg:flex lg:flex-row lg:p-4 text-center justify-center ">
        {DATA.map((item, i) => (
          <div key={i} className="vitem">
            <ItemContainer submenu={item.submenu}>
              <span className="mr-1">
                <FormattedMessage id={item.title} />
              </span>
              <TextGradient>{item.value}</TextGradient>
              {i !== DATA.length - 1 && (
                <span className="hidden lg:inline-flex mx-3">·</span>
              )}
            </ItemContainer>
          </div>
        ))}
      </div>
      <div className="w-full absolute h-2 top-0 left-0 bg-gradient-to-b from-[#2d252e] to-transparent"></div>
      <div className="w-full absolute h-2 bottom-0 left-0  bg-gradient-to-b to-[#2d252e] from-transparent"></div>
    </div>
  );
}

export default HeaderInfos;

const ItemContainer = (props) => {
  const { children, submenu } = props;
  const [showMenu, setShowMenu] = useState(false);

  const { partneredCreators, onlinePartneredCreators } = useContext(AppContext);

  if (submenu) {
    return (
      <Menu as="div" className="relative inline-block text-left cursor-pointer">
        <div
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <>{children}</>
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
            <Menu.Items className="origin-top top-3.5 absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-md shadow-lg bg-[#2c252e] ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
              <div className="text-sm">
                <div className="bg-red-700/20 rounded text-red-500 text-xs p-2 mb-3 inline-flex">
                  <div>
                    <ExclamationIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 ml-2">
                    <FormattedMessage id="creator.partnered.warning_1" />
                  </div>
                </div>
                <div className="bg-green-700/20 rounded text-green-500  text-xs p-2 mb-3 inline-flex">
                  <div>
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 ml-2">
                    <FormattedMessage id="creator.partnered.warning_2" />
                  </div>
                </div>
              </div>
              {partneredCreators.map((creator, index) => (
                <Menu.Item key={`partner-${index}`}>
                  <a
                    href={`https://www.twitch.tv/${creator.twitch.login}`}
                    target="_blank"
                    className="flex items-center rounded-lg hover:bg-black/20 px-4 py-2 border border-white/10 mb-3"
                  >
                    <div className="relative">
                      <img
                        src={creator.twitch.profile_image_url}
                        width="40"
                        height="40"
                        className="rounded"
                      />
                      <div
                        className={clsx(
                          "absolute w-4 h-4 bg-red-500 -bottom-0.5 -left-0.5 border-4 border-[#2c252e] rounded-full",
                          {
                            ["bg-green-500"]: onlinePartneredCreators?.includes(
                              creator.twitch.login
                            ),
                          }
                        )}
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="font-medium mb-0.5 text-white">
                        {creator.twitch.display_name}
                      </div>
                      <div className="text-pink-500 text-xs">
                        twitch.tv/{creator.twitch.login}
                      </div>
                    </div>
                  </a>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    );
  }

  return <>{children}</>;
};
