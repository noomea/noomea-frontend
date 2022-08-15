import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { isSameDay } from "date-fns";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import clsx from "clsx";

import { LIMIT_NOOM_PER_DAY, LIMIT_TRANSACTIONS_PROFILE } from "../variables";
import Transactions from "./Transactions";
import TextGradient from "./TextGradient";
import ApplyForCreator from "./ApplyForCreator";
import { FormattedMessage, useIntl } from "react-intl";

function ProfileTabs(props) {
  const { user } = props;
  const [dropsToday, setDropsToday] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const intl = useIntl();

  const getDropsToday = () => {
    const today = new Date();

    const fetchDropsToday =
      Math.round(
        (user?.drops?.reduce((total, drop) => {
          if (!isSameDay(today, drop._createTimestamp.toDate())) return total;

          return (total += drop.amount);
        }, 0) || 0) * 10
      ) / 10;

    return fetchDropsToday;
  };

  useEffect(() => {
    const fetchDropsToday = getDropsToday();
    setDropsToday(fetchDropsToday);
  }, [user.drops]);

  useEffect(() => {
    if (!user || !user?.transactions?.length) return;
    setTransactions(
      user.transactions.reverse().slice(0, LIMIT_TRANSACTIONS_PROFILE)
    );
  }, [user.transactions]);

  return (
    <Tab.Group>
      <div className="flex justify-center mt-24">
        <Tab.List className="inline-flex p-2 bg-black/20 rounded-full">
          <TabButton name={intl.formatMessage({ id: "profile.tabs.viewer" })} />
          <TabButton
            name={intl.formatMessage({ id: "profile.tabs.creator" })}
          />
        </Tab.List>
      </div>
      <Tab.Panels className="py-16">
        <Tab.Panel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12">
            <div className="lg:col-span-2">
              <h6 className="font-bold uppercase text-xs mb-4">
                <FormattedMessage id="transactions.title" />
              </h6>
              <Transactions signatures={transactions} />
            </div>
            <div className="">
              <h6 className="font-bold uppercase text-xs mb-4">
                <FormattedMessage id="earnings.title" />
              </h6>
              <div className="bg-black/20 rounded-lg text-sm text-white/30 p-8">
                <div className="text-center">
                  <h5 className="text-white font-bold uppercase">
                    <FormattedMessage id="earnings.today" />
                  </h5>
                  <p>
                    <FormattedMessage
                      id="earnings.max_description"
                      values={{ limit: LIMIT_NOOM_PER_DAY }}
                    />
                  </p>
                </div>
                <div className="relative my-6">
                  <Doughnut
                    datasetIdKey="id"
                    options={{
                      maintainAspectRatio: false,
                      rotation: -90,
                      circumference: 180,
                      cutout: 64,
                      // radius: 100,
                      elements: {
                        arc: {
                          borderRadius: 20,
                        },
                      },
                      borderColor: "transparent",
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    data={{
                      labels: ["Earned today", "Available"],
                      datasets: [
                        {
                          data: [dropsToday, LIMIT_NOOM_PER_DAY - dropsToday],
                          backgroundColor: [
                            "rgb(236 72 153)",
                            "rgba(207,207,207,0.12)",
                          ],
                        },
                      ],
                    }}
                  />
                  <div className="absolute text-center bottom-8 font-bold text-lg w-full">
                    <TextGradient>{dropsToday} NOOM</TextGradient>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <ApplyForCreator />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

const TabButton = (props) => {
  const { name } = props;

  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            "relative py-2 px-10 rounded-full  text-white/80 hover:text-white outline-hidden transition group text-sm",
            {
              ["bg-gradient-to-r from-[#ff00b1]  to-[#ff6abf] text-white pointer-events-none"]:
                selected,
            }
          )}
        >
          <div className="group-active:scale-90 relative transition-all">
            {name}
          </div>
        </button>
      )}
    </Tab>
  );
};

export default ProfileTabs;
