import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  CheckIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";

function CreatorsList(props) {
  const { partneredCreators, onlinePartneredCreators } = props;

  const [mainCreator, setMainCreator] = useState({});
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const switchCreator = (type) => {
    const nextCreatorLoop =
      currentCreatorIndex === partneredCreators.length - 1
        ? 0
        : currentCreatorIndex + 1;

    setCurrentCreatorIndex(nextCreatorLoop);

    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 100);
  };

  useEffect(() => {
    if (!partneredCreators?.length) return;
    setMainCreator(partneredCreators[currentCreatorIndex]);
  }, [partneredCreators, currentCreatorIndex]);

  const variants = {
    rotate: {
      opacity: [1, 0.8, 1],
      scale: [1, 0.95, 1],
      transition: { duration: 0.3, ease: [0.87, 0, 0.13, 1] },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, top: 20 }}
      whileInView={{ opacity: 1, top: 0 }}
      className="relative"
    >
      <div className="container mx-auto pb-20 py-32">
        <div style={{ maxWidth: 1024 }} className="mx-auto">
          <h2 className="text-4xl font-bold leading-normal text-center mb-16 px-12">
            Partnered Creators
          </h2>
          <div className="flex justify-between items-center flex-col-reverse lg:flex-row lg:space-x-8">
            <div className="max-w-lg text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold leading-normal mt-12 lg:mt-0">
                Watch our creators today
              </h3>
              <div className="text-white/50 mt-4">
                <div className="text-yellow-400 mb-2 inline-flex items-center">
                  <ExclamationIcon className="h-5 w-5 mr-2" />
                  <span className="flex-1">
                    These are creators for demo purpose only (not partnered).
                  </span>
                </div>
                <div className="inline-flex items-center">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  <span className="flex-1">
                    "Watch and earn" feature is enabled on their streams.
                  </span>
                </div>
              </div>
            </div>

            <div>
              {Object.keys(mainCreator).length !== 0 && (
                <div className="relative">
                  <div className="absolute -left-16 translate-y-1/2 -mt-6 -ml-2 h-full z-10">
                    <ArrowCircleLeftIcon
                      className="h-14 w-14 text-gray-400 hover:text-white transition cursor-pointer bg-[#372e3a] p-1 rounded-full active:scale-90"
                      onClick={() => switchCreator("previous")}
                    />
                  </div>
                  <div className="absolute -right-16 translate-y-1/2 -mt-6 -mr-2 h-full z-10">
                    <ArrowCircleRightIcon
                      className="h-14 w-14 text-gray-400 hover:text-white transition cursor-pointer bg-[#372e3a] p-1 rounded-full active:scale-90"
                      onClick={() => switchCreator("next")}
                    />
                  </div>
                  <div className="bg-black/20 rounded-2xl w-32 h-48 absolute -left-10 translate-y-8"></div>
                  <div className="bg-black/20 rounded-2xl w-32 h-48 absolute -right-10 translate-y-8"></div>
                  <div className="relative z-10">
                    <a
                      href={`https://twitch.tv/${mainCreator.twitch?.login}`}
                      target="_blank"
                    >
                      <div className="bg-white p-4 w-56 rounded-lg text-center hover:scale-105 transition-all ease-in-out duration-300">
                        <motion.div
                          variants={variants}
                          animate={animate ? "rotate" : ""}
                        >
                          <img
                            src={mainCreator.twitch.profile_image_url}
                            width="160"
                            height="160"
                            className="rounded-3xl mx-auto"
                          />
                          <div
                            className={clsx(
                              "bg-red-200 text-red-500 px-4 py-3 rounded-lg text-xs inline-flex mx-auto mt-4 items-center",
                              {
                                ["bg-green-200 text-green-500"]:
                                  onlinePartneredCreators?.includes(
                                    mainCreator.twitch.login
                                  ),
                              }
                            )}
                          >
                            <span className="h-2 w-2 rounded-full mr-2 bg-current" />
                            <span className="font-medium">
                              twitch.tv/{mainCreator.twitch?.login}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CreatorsList;
